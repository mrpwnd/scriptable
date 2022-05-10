// Cache script must be present in Scriptable for it to work.

const { config } = require("chai");

// Cache keys and current location.
const CACHE_KEY_LAST_UPDATED = 'last_updated';
const CACHE_KEY_LOCATION = 'location';
const DEFAULT_LOCATION = {
    latitude: 0, longitude: 0
};

// Font name and size
const FONT_NAME = 'Menlo';
const FONT_SIZE = 12;

// Colors
const COLORS = {
    bg0: '#29323C',
    bg1: '#1C1C1C',
    personalCalendar: '#5BD2F0',
    workCalendar: '#9D90FF',
    weather: '#FDFD97',
    location: '#FEB144',
    deviceStats: '#7AE7B9',
};

// Place your own values in ''
// Get WEATHER_API_KEY from https://home.openweathermap.org/api_keys
const NAME = '';
const WATHER_API_KEY = ''; 
const WORK_CALENDAR_NAME = '';
const PERSONAL_CALENDAR_NAME = '';
const USE_BACKGROUND_IMAGE = false;

// SETUP
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

const Cache = importModule('Cache');
const cache = new Cache('terminalWidget');
const data = await fetchData();
const widget = createWidget(data);

if (USE_BACKGROUND_IMAGE) {
    const files = FileManager.iCloud();
    const path = files.joinPath(files.documentsDirectory(), 'terminal-widget-background');
    const exists = files.fileExists(path);

    if (exists && config.runsInWidget) {
        widget.backgroundImage = files.readImage(path);
    }

    else if (!exists && config.runsInWidget) {
        const bgColor = new LinearGradient();
        bgColor.colors = [new Color('#29323C'), new Color('1C1C1C')];
        bgColor.locations = [0.0, 1.0];
        widget.backgroundGradient = bgColor;
    }

    else if (config.runsInApp) {
        const img = await Photos.fromLibrary();
        widget.backgroundImage = img;
        files.writeImage(path, img);
    }
}

if (config.runsInApp) {
    widget.presentMedium();
}

Script.setWidget(widget);
Script.complete();

