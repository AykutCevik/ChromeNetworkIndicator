/**
 * Handler for user settings
 * @param {LocalStorageProvider} localStorageProvider
 * @returns {SettingsProvider}
 */
function SettingsProvider(localStorageProvider){
    this.localStorageProvider = localStorageProvider;
    this.dataSyncTimeout = 2000;
    this.colorIncomingData = '#0092e6';
    this.colorOutgoingData = '#000000';
    
    /**
     * Loads user settings
     * @returns {void}
     */
    this.loadSettings = function(){
        // TODO implement
    };
    
    /**
     * Saves user settings
     * @returns {void}
     */
    this.saveSettings = function(){
        // TODO implement
    };
}