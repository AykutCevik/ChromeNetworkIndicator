/**
 * @param {Object} jsonObj Json object of this type
 * @returns {NetworkDataHistory}
 */
function NetworkDataHistory(jsonObj) {
    this.history = [];
    this.sentHistory = [];

    if (jsonObj !== undefined) {
        for (attr in jsonObj) {
            this[attr] = jsonObj[attr];
        }
    }

    /**
     *
     * @param {Number} byteCount
     * @returns {void}
     */
    this.addData = function (byteCount) {
        var today = moment().format('L'); // can change in a session
        if (this.history[today] === undefined) {
            this.history[today] = 0;
        }
        this.history[today] += byteCount;
    };

    /**
     *
     * @param {Number} byteCount
     * @returns {void}
     */
    this.addSentData = function (byteCount) {
        var today = moment().format('L'); // can change in a session
        if (this.sentHistory[today] === undefined) {
            this.sentHistory[today] = 0;
        }
        this.sentHistory[today] += byteCount;
    };
}