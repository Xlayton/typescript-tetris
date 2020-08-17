import { Game } from './Game'

export const requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        //window.webkitRequestAnimationFrame || 
        //window.mozRequestAnimationFrame    || 
        //window.oRequestAnimationFrame      || 
        window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

(() => {
    "use strict";

    function init() {
        const game = new Game();
    }

    window.addEventListener('DOMContentLoaded', init, false);
})();

