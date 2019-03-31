// ==UserScript==
// @name         SEX.COM repin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://sex.com/*
// @match        https://www.sex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var mutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.type == 'childList') {
                trySetBoard();
            }
        });
    });

    // Starts listening for changes in the root HTML element of the page.
    mutationObserver.observe(document.body, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });

    function trySetBoard() {
        let json = localStorage.getItem('create') || "{}";
        let data = JSON.parse(json);

        $('#board').val(data.board);

        $('#board').change((e) => {
            let json = localStorage.getItem('create') || "{}";
            let data = JSON.parse(json);
            data.board = $('#board').val();

            json = JSON.stringify(data);
            localStorage.setItem('create', json);
        });

        const success = $('#success_message');
        if (success.length) {
            $('#modal-pin-it').modal('hide');
        }
    }
})();
