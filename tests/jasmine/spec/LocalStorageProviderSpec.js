describe("LocalStorageProvider", function() {
    var localStorageProvider;

    beforeEach(function() {
        localStorageProvider = new LocalStorageProvider();
    });

    it("saves an object and loads the same object", function() {
        var networkData = new NetworkData();
        networkData.dataSyncTimeout = 1000;

        // save it
        localStorageProvider.set('key', networkData);

        // load it
        var loadedNetworkData = localStorageProvider.get('key');

        // test
        expect(networkData.dataSyncTimeout).toBe(loadedNetworkData.dataSyncTimeout);
    });
});