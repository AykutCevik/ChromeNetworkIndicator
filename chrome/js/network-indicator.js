var jsClasses = new Array('Constants', 'CanvasHandler', 'LocalStorageProvider', 'NetworkData', 'SettingsProvider', 'NetworkDataHandler', 'Application');
var application = null;

function main() {
    application = new Application(KEY_CANVAS_ID);
    application.run();
}

function classLoader() {
    for (var i = 0; i < jsClasses.length; i++) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'js/classes/' + jsClasses[i] + '.js';
        document.head.appendChild(script);
    }
}

document.addEventListener('DOMContentLoaded', classLoader);
window.onload = main;