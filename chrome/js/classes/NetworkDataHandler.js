/**
 * Handler for chrome web requests
 * @param {NetworkData} networkData
 * @param {NetworkDataHistory} networkDataHistory
 * @returns {NetworkDataHandler}
 */
function NetworkDataHandler(networkData, networkDataHistory) {
    this.catchedData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.sentData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.networkData = networkData;
    this.networkDataHistory = networkDataHistory;
    this.onHandledIncomingData = null;
    this.onHandledOutgoingData = null;
    this.countOutgoingMethods = ['POST', 'PUT', 'DELETE'];

    /**
     * Sets the event handler for chrome web requests
     * @returns {void}
     */
    this.attachNetworkEvent = function () {
        chrome.webRequest.onCompleted.addListener(function (data) {
            application.networkDataHandler.handleIncomingRequest(data);
        }, {urls: ["<all_urls>"]}, ["responseHeaders"]);

        // for later use
        // chrome.webRequest.onBeforeRequest.addListener(function (data) {
        //     application.networkDataHandler.handleOutgoingRequest(data);
        // }, {urls: ["<all_urls>"]}, ["requestBody"]);
    };

    /**
     *
     * @param {Object} data
     * @returns {void}
     */
    this.handleIncomingRequest = function (data) {
        console.log(data);
        for (i = 0; i < data.responseHeaders.length; i++) {
            var header = data.responseHeaders[i];
            if (header.name.toLowerCase() === 'content-length') {
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

    /**
     *
     * @param {Object} data
     * @returns {void}
     */
    this.handleOutgoingRequest = function (data) {

        if (this.countOutgoingMethods.indexOf(data.method) != -1) {

            console.log(data);
            var dataLength = 0;
            if (data.requestBody.formData != undefined) {
                console.log(data.requestBody.formData);
                dataLength += JSON.stringify(data.requestBody.formData).length;
                console.log(dataLength);
            }
            if (data.requestBody.uploadData != undefined) {
                console.log(data.requestBody.uploadData);
                dataLength += data.requestBody.uploadData.bytes.byteLength;
                console.log(dataLength);
            }
            if (data.requestBody.raw != undefined) {
                console.log(data.requestBody.raw);
                dataLength += data.requestBody.raw[0].bytes.byteLength;
                console.log(dataLength);
            }

            if (dataLength > 0) {
                this.networkData.sumSentRequest(dataLength);
                this.networkDataHistory.addSentData(dataLength);
                this.sentData.shift();
                this.sentData.push(dataLength);

                if (this.onHandledOutgoingData !== null) {
                    this.onHandledOutgoingData();
                }
            }
        }


    };
}