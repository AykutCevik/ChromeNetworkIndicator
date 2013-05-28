/**
 * 
 * @param {Canvas} context
 * @returns {CanvasHandler}
 */
function CanvasHandler(context) {
    this.context = context;
    this.maxLineHeight = 17;

    /**
     * Draws background stuff
     * @returns {void}
     */
    this.drawBackground = function() {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, 19, 19);
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(1, 1, 17, 17);
    };

    /**
     * Draws lines representing the network load
     * @returns {void}
     */
    this.drawLoadLines = function() {
        for (var i = 0; i < application.networkDataHandler.catchedData.length; i++) {
            var valPerc = application.networkDataHandler.catchedData[i] * 100 / application.networkDataHandler.catchedData.max();
            var lineHeigth = Math.max(1, (this.maxLineHeight * valPerc / 100));
            this.context.lineWidth = 1;
            this.context.beginPath();
            var xStart = Math.max(1, (i + 1) - 0.5);
            var xEnd = xStart;
            var yStart = (this.maxLineHeight - lineHeigth) + 1;
            var yEnd = this.maxLineHeight + 1;
            this.context.moveTo(xStart, yStart);
            this.context.lineTo(xEnd, yEnd);
            this.context.strokeStyle = application.settings.colorIncomingData;
            this.context.stroke();
        }
    };

    /**
     * Draws the application
     * @returns {void}
     */
    this.draw = function() {
        this.drawBackground();
        this.drawLoadLines();
        chrome.browserAction.setIcon({imageData: this.context.getImageData(0, 0, 19, 19)});
    };
}