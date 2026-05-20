const STATS_SHEET_NAME = "Stats";

function doGet() {
  return jsonResponse(getStats());
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const type = body.type || "visitor";
    const platform = body.platform || "";
    const stats = getStats();
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");

    if (stats.todayDate !== today) {
      stats.todayDate = today;
      stats.todayClicks = 0;
    }

    if (type === "click") {
      stats.totalClicks = Number(stats.totalClicks || 0) + 1;
      stats.todayClicks = Number(stats.todayClicks || 0) + 1;
      if (platform && ["ig", "tt", "line"].includes(platform)) {
        stats[platform] = Number(stats[platform] || 0) + 1;
      }
    } else if (type === "visitor") {
      stats.visitorCount = Number(stats.visitorCount || 0) + 1;
    }

    saveStats(stats);
    return jsonResponse({ success: true, stats });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function getStats() {
  const sheet = getStatsSheet();
  const values = sheet.getRange(1, 1, 8, 2).getValues();
  const data = {};
  values.forEach(([key, value]) => {
    if (!key) return;
    data[key] = value;
  });
  return {
    totalClicks: Number(data.totalClicks || 0),
    todayClicks: Number(data.todayClicks || 0),
    visitorCount: Number(data.visitorCount || 0),
    ig: Number(data.ig || 0),
    tt: Number(data.tt || 0),
    line: Number(data.line || 0),
    todayDate: data.todayDate || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd"),
  };
}

function saveStats(stats) {
  const sheet = getStatsSheet();
  const rows = [
    ["totalClicks", stats.totalClicks],
    ["todayClicks", stats.todayClicks],
    ["visitorCount", stats.visitorCount],
    ["ig", stats.ig],
    ["tt", stats.tt],
    ["line", stats.line],
    ["todayDate", stats.todayDate],
  ];
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
}

function getStatsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(STATS_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(STATS_SHEET_NAME);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
