/**
 * Workflow
 * @param {String} canvasId
 * @returns {Application}
 */
function Application(canvasId) {
    this.canvasId = canvasId;
    this.canvasContext = null;
    this.canvasHandler = null;
    this.networkData = null;
    this.networkDataHistory = null;
    this.networkDataHandler = null;
    this.localStorageProvider = new LocalStorageProvider();
    this.settings = new SettingsProvider();

    /**
     * Starts the application
     * @returns {void}
     */
    this.run = function() {
        this.loadNetworkHandler();
        this.loadCanvasEnvironment();
    };

    /**
     * Initializes the network handler
     * @returns {void}
     */
    this.loadNetworkHandler = function() {
        if (this.localStorageProvider.isSet(KEY_NETWORKDATA)) {
            this.networkData = new NetworkData(this.localStorageProvider.get(KEY_NETWORKDATA));
        } else {
            this.networkData = new NetworkData();
        }
        if (this.localStorageProvider.isSet(KEY_NETWORKDATAHISTORY)) {
            this.networkDataHistory = new NetworkDataHistory(this.localStorageProvider.get(KEY_NETWORKDATAHISTORY));
        } else {
            this.networkDataHistory = new NetworkDataHistory();
        }
        this.networkDataHandler = new NetworkDataHandler(this.networkData, this.networkDataHistory);
        this.networkDataHandler.onHandledIncomingData = function() {
            application.canvasHandler.draw('incoming');
        };
        this.networkDataHandler.onHandledOutgoingData = function() {
            application.canvasHandler.draw('outgoing');
        };
        this.networkDataHandler.attachNetworkEvent();
        setInterval(function() {
            application.saveNetworkData();
        }, this.settings.dataSyncTimeout);
    };

    /**
     * Persists the network data to local storage
     * @returns {void}
     */
    this.saveNetworkData = function() {
        this.localStorageProvider.set(KEY_NETWORKDATA, this.networkData);
        this.localStorageProvider.set(KEY_NETWORKDATAHISTORY, this.networkDataHistory);
    };

    /**
     * Loads the canvas context
     * @returns {void}
     */
    this.loadCanvasEnvironment = function() {
        this.canvasContext = window.document.getElementById(this.canvasId).getContext('2d');
        this.canvasHandler = new CanvasHandler(this.canvasContext);
        this.canvasHandler.draw();
    };
}