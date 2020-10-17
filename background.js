(() => {
    'use strict';

    const SEARCH_COMMAND = 'search-text';
    const DEFINE_COMMAND = 'define-text';

    /**
     * Triggered on configured command activation
     */
    chrome.commands.onCommand.addListener((command) => {
        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function (selection) {
            console.log('selection is', selection);
            switch(command) {
                case SEARCH_COMMAND:
                    search(selection);
                    break;
                case DEFINE_COMMAND:
                    define(selection);
                    break;
                default:
                    return;
            }
        });
    });

    /**
     * Searches for text.
     *
     * @param {string} text to search for
     */
    function search(text) {
        queryInNewTab(text);
    }

    /**
     * Defines text.
     *
     * @param {string} text to search for
     */
    function define(text) {
        queryInNewTab(`define ${text}`);
    }

    /**
     * Opens a tab with term as search query.
     *
     * @param {string} term to open tab with
     */
    function queryInNewTab(term) {
        chrome.tabs.create({ url: `https://www.google.com/search?q=${term}` });
    }
})();