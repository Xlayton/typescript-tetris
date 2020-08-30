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

export let game: Game;
export let dummyGame: Game;

export const startGame = (() => {
    game = new Game("gameCanvas", true);
    dummyGame = new Game("dummyCanvas", false);
});

