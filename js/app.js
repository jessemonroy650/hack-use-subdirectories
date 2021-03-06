var app = {
    version : '1.0.0',
    targetEvent : 'click',
    isCordova   : false,
    stop        : false,

    // start the "ticker", if (not app.stop)
    kickTicker : function () {
        if (! app.stop) {
            setTimeout(app.updateDateTimeDisplay, 1000);
        }
    },
    //
    updateDateTimeDisplay : function () {
        datetime.get();
        //document.getElementById('epochTime').innerHTML = datetime.epoch;
        //  Date
        document.getElementById('month').innerHTML     = datetime.monthString[datetime.monthStr];
        document.getElementById('date').innerHTML      = datetime.dateStr;
        document.getElementById('year').innerHTML      = datetime.yearStr;
        //  Day Of the Week
        document.getElementById('dow').innerHTML       = datetime.dowString[datetime.dowStr];
        //  Time
        //  https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
        document.getElementById('hour').innerHTML      = ('0' + datetime.hourStr).slice(-2);
        document.getElementById('minute').innerHTML    = ('0' + datetime.minuteStr).slice(-2);
        document.getElementById('second').innerHTML    = ('0' + datetime.secondStr).slice(-2);
        app.kickTicker();
    },
    //
    hook : function () {
        // SHOULD HIDE THIS BUTTON IN THE BROWSER ONLY
        document.getElementById('exitApp').addEventListener(app.targetEvent,
            function () { 
                if (app.isCordova) {
                    navigator.app.exitApp();  
                } else {
                    app.stop = ! app.stop;
                    app.kickTicker();
                }
            },
            false);
    },
    //
    onDOMContentLoaded : function () {
        app.hook();
        //
        document.getElementById('appVersion').innerHTML  = app.version;
        //
        app.isCordova                               = (typeof window.cordova !== "undefined");
        document.getElementById('status').innerHTML = 'is webbrowser';
        app.updateDateTimeDisplay();
    },
    //
    onDeviceReady : function () {
        app.targetEvent = 'touchend';
        //
        app.isCordova                               = (typeof window.cordova !== "undefined");
        document.getElementById('status').innerHTML = 'is Cordova';
        document.getElementById('appIcon').src      = 'img/icon.png';
        //window.screen.orientation.lock('landscape-primary');
    }
}
