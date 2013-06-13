/**
 * Handler for chrome web requests
 * @param {NetworkData} networkData
 * @param {NetworkDataHistory} networkDataHistory
 * @returns {NetworkDataHandler}
 */
function NetworkDataHandler(networkData, networkDataHistory) {
    this.catchedData = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    this.networkData = networkData;
    this.networkDataHistory = networkDataHistory;
    this.onHandledIncomingData = null;

    /**
     * Sets the event handler for chrome web requests
     * @returns {void}
     */
    this.attachNetworkEvent = function() {
        chrome.webRequest.onCompleted.addListener(function(data) {
            application.networkDataHandler.handleIncomingRequest(data);
        }, {urls: ["<all_urls>"]}, ["responseHeaders"]);
    };

    /**
     * 
     * @param {Object} data
     * @returns {void}
     */
    this.handleIncomingRequest = function(data) {
        for (i = 0; i < data.responseHeaders.length; i++)
        {
            var header = data.responseHeaders[i];
            if (header.name === 'Content-Length') {
                var dataLength = parseInt(data.responseHeaders[i].value);
                this.networkData.sumRequest(dataLength);
                this.networkDataHistory.addData(dataLength);
                this.catchedData.shift();
                this.catchedData.push(dataLength);
                break;
            }
        }

        if (this.onHandledIncomingData !== null) {
            this.onHandledIncomingData();
        }
    };
}