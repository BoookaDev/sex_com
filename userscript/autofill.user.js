// ==UserScript==
// @name         SEX.COM autofill
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://upload.sex.com/pin/create*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    restore();

    $('span.tag').each((n, span) => {
        let input = document.querySelector(`input#${span.getAttribute('for')}`);
        span.addEventListener('click', () => {
            store(`tags`, input.value, input.checked);
        });
    });
    $('#board, #title').change((e) => {
        store(e.target.id, e.target.value);
    });

    function restore(){
        let json = localStorage.getItem('create') || "{}";
        let data = JSON.parse(json);

        Object.keys(data).forEach(key => {
            switch(key){
                case "tags":
                    data[key].forEach(val => {
                        document.querySelector(`input[value="${val}"]`).setAttribute('checked', 'checked');
                        document.querySelector(`span[for="create_${val}"]`).classList.add('selected');
                    });
                    break;
                case "board":
                    document.querySelector(`#board option[value="${data[key]}"]`).setAttribute('selected', 'selected');
                default:
                    document.querySelector(`#${key}`).value = data[key];
                    break;
            }
        });
    }

    function store(key, value, checked) {
        let json = localStorage.getItem('create') || "{}";
        let data = JSON.parse(json);

        if(arguments.length === 3){
            data[key] = new Set(data[key]);
            if(checked) {
                data[key].add(value);
            } else {
                data[key].delete(value);
            }

            data[key] = Array.from(data[key]);
        } else {
            data[key] = value;
        }

        json = JSON.stringify(data);
        localStorage.setItem('create', json);
    }
})();
