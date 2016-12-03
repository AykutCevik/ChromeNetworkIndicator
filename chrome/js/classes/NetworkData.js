/**
 * Container for network data
 * @param {Object} jsonObj Json object of this type
 * @returns {NetworkData}
 */
function NetworkData(jsonObj) {

    this.incomingData = 0;
    this.outgoingData = 0;
    this.requestCount = 0;
    this.outgoingRequestCount = 0;

    if (jsonObj !== undefined) {
        for (attr in jsonObj){
            this[attr] = jsonObj[attr];
        }
    }

    /**
     * 
     * @param {Number} byteCount
     * @returns {void}
     */
    this.sumRequest = function(byteCount) {
        this.incomingData += byteCount;
        this.requestCount++;
    };

    /**
     *
     * @param {Number} byteCount
     * @returns {void}
     */
    this.sumSentRequest = function(byteCount) {
        this.outgoingData += byteCount;
        this.outgoingRequestCount++;
    };
}