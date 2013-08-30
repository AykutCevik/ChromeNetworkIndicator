var refreshTimer = null;
var storageProvider = null;
var totalBytesDom = null;
var totalRequestsDom = null;
function init() {
    totalBytesDom = document.getElementById('totalBytes');
    totalRequestsDom = document.getElementById('totalRequests');

    if (storageProvider === null) {
        storageProvider = new LocalStorageProvider();
    }
    if (refreshTimer === null) {
        loadData();
        refreshTimer = window.setInterval(loadData, 1000);
    }
}
function loadData() {
    var tmpNetworkData = storageProvider.get(KEY_NETWORKDATA);
    var networkData = new NetworkData(tmpNetworkData);

    //totalBytesDom.innerHTML = parseSize(networkData.incomingData);
    totalBytesDom.innerHTML = addThousandCommas(networkData.incomingData);
    totalRequestsDom.innerHTML = addThousandCommas(networkData.requestCount);
}

// human readable output?
function parseSize(size) {
    var suffix = ["yBtes", "Kb", "Mb", "Gb", "Tb", "Pb"],
    tier = 0;
    while(size >= 1024) {
        size = size / 1024;
        tier++;
    }
    return Math.round(size * 10) / 10 + " " + suffix[tier];
}

function addThousandCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

window.onload = init;
