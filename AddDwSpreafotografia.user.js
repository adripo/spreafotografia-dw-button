// ==UserScript==
// @name         Add Download full photo button
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @author       adripo
// @description  Add button to download photo at full resolution on spreafotografia.it
// @homepage     https://github.com/adripo/spreafotografia-dw-button
// @icon         http://spreafotografia.it/favicon.ico
// @updateURL    https://raw.githubusercontent.com/adripo/spreafotografia-dw-button/main/AddDwSpreafotografia.meta.js
// @downloadURL  https://raw.githubusercontent.com/adripo/spreafotografia-dw-button/main/AddDwSpreafotografia.user.js
// @supportURL   https://github.com/adripo/yt_signin_popup/wiki
// @match        http://www.spreafotografia.it/photo-*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Icons made by https://www.flaticon.com/authors/pixel-perfect
    const iconDownload = `<svg width="42" height="42" viewBox="-3 -3 30 30" fill="#fff"><path d="m13.5 8.99c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l1.47-1.47c.346-.352.813-.549 1.312-.551h.009c.5 0 .972.196 1.327.552.016.015.029.032.043.048.173.147.399.224.63.209.253-.015.478-.131.633-.326l.722-.893c.711-.892 2.205-.894 2.92.002l.68.85c.172.215.138.53-.078.703s-.53.138-.703-.079l-.68-.85c-.334-.419-1.025-.419-1.359 0l-.722.893c-.327.41-.82.666-1.352.698-.535.031-1.059-.163-1.438-.536-.018-.017-.034-.036-.049-.055-.16-.14-.361-.216-.574-.216-.002 0-.003 0-.004 0-.23.001-.445.091-.606.255l-1.473 1.474c-.098.096-.226.145-.354.145z"/><path d="m21.5 11h-7c-.827 0-1.5-.673-1.5-1.5v-8c0-.827.673-1.5 1.5-1.5h7c.827 0 1.5.673 1.5 1.5v8c0 .827-.673 1.5-1.5 1.5zm-7-10c-.275 0-.5.224-.5.5v8c0 .276.225.5.5.5h7c.275 0 .5-.224.5-.5v-8c0-.276-.225-.5-.5-.5z"/><path d="m1.5 18c-.276 0-.5-.224-.5-.5v-15c0-1.378 1.121-2.5 2.5-2.5h7c.276 0 .5.224.5.5s-.224.5-.5.5h-7c-.827 0-1.5.673-1.5 1.5v15c0 .276-.224.5-.5.5z"/><path d="m7.5 20h-4c-1.379 0-2.5-1.122-2.5-2.5s1.121-2.5 2.5-2.5h14.5v-1.5c0-.276.224-.5.5-.5s.5.224.5.5v2c0 .276-.224.5-.5.5h-15c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5h4c.276 0 .5.224.5.5s-.224.5-.5.5z"/><path d="m18.5 20h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5.5v-3.5c0-.276.224-.5.5-.5s.5.224.5.5v4c0 .276-.224.5-.5.5z"/><path d="m12.5 24c-.111 0-.222-.037-.313-.109l-2.187-1.751-2.188 1.75c-.151.12-.355.144-.529.06-.173-.083-.283-.258-.283-.45v-6c0-.276.224-.5.5-.5s.5.224.5.5v4.959l1.688-1.35c.184-.146.441-.146.625 0l1.687 1.35v-4.959c0-.276.224-.5.5-.5s.5.224.5.5v6c0 .192-.11.367-.283.451-.07.033-.144.049-.217.049z"/><path d="m14.5 18h-9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h9c.276 0 .5.224.5.5s-.224.5-.5.5z"></svg>`;

    addButton();

    function addButton() {
        // get button
        let parent =document.querySelector("div.left-box").children[0];
        setButton(parent);
    }

    function setButton(parent) {
        // create
        const button = document.createElement("a");
        button.className = `photo-icon photo-new-tab img-responsive`;
        setButtonStyle();
        button.innerHTML = iconDownload;
        button.addEventListener("click", onClick);
        parent.appendChild(button);
    }

    function setButtonStyle() {
        GM_addStyle(`
.photo-new-tab {
    background: #c6c6c6 no-repeat;
    cursor: pointer;
    border-radius: 3px;
}

.photo-new-tab:hover {
    background-color: #2fb510;
}
`);
    }

    function onClick() {
        // get img url
        const img = document.querySelector("#photofull img");
        const imgUrl = getImgUrl(img.src);

        // open new tab
        const tab = window.open(imgUrl, '_blank');
        tab.focus();
    }

    function getImgUrl (src) {
        const regex = /(?<=src=)http:\/\/www\.spreafotografia\.it\/photos\/.+\.jpg(?=&)/;
        let m;

        if ((m = regex.exec(src)) !== null) {
            return m[0];
        }

        return null;
    }

    function GM_addStyle(aCss) {
        let head = document.getElementsByTagName('head')[0];
        if (head) {
            let style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.textContent = aCss;
            head.appendChild(style);
            return style;
        }
        return null;
    }

})();
