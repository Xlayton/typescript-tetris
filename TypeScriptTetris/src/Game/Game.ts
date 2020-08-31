import { Shape } from './Shape';
import { Grid } from './Grid';
import { requestAnimFrame } from './app';
import { StraightShape } from './StraightShape';
import { LShape } from './LShape';
import { SquareShape } from './SquareShape';
import { StepShape } from './StepShape';
import { TShape } from './TShape';
import { EventEmitter } from 'events';

export class Game extends EventEmitter {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private running: boolean = false;
    private currentShape: Shape;
    private grid: Grid;
    private speed: number; // in milliseconds
    private level: number;
    private rowsCompleted: number;
    static gameState = { initial: 0, playing: 1, paused: 2, gameover: 3 };
    private phase = Game.gameState.initial;
    // private score: number;
    // private scoreLabel = document.getElementById('scoreLabel') as HTMLSpanElement;
    // private rowsLabel = document.getElementById('rowsLabel') as HTMLSpanElement;
    // private levelLabel = document.getElementById('levelLabel') as HTMLSpanElement;
    private messageLabel = document.getElementById('floatingMessage') as HTMLDivElement;
    private timerToken: any;
    // private pausedImage: HTMLImageElement;

    constructor(canvasId: string, hasKeyControls: boolean) {
        super();
        this.canvas = (document.getElementById(canvasId) as HTMLCanvasElement);
        this.context = this.canvas.getContext("2d");
        this.grid = new Grid(16, 10, 20, 'black', this.canvas);
        this.grid.eraseGrid();
        this.speed = 1000;
        const x = this;
        if (hasKeyControls) {
            document.onkeydown = function (e) { x.keyhandler(e); }; // gets the wrong thing as this, so capturing the right this
        } else {
            this.newGame();
        }
        // this.showMessage("Press F2 to start");
    }

    public serialize(): string {
        return JSON.stringify({
            gridColors: this.grid.blockColor,
            state: this.phase,
            currentShape: this.currentShape
        })
    }

    public deserialize(data: any): Game {
        let parse = JSON.parse(data);
        this.grid.blockColor = parse.gridColors;
        this.phase = parse.state;
        this.currentShape = parse.currentShape;
        return this;
    }

    public draw() {
        if (this.phase == Game.gameState.playing) {
            this.grid.paint();
            this.grid.draw(this.currentShape);
            // recursive render loop
            requestAnimFrame.call(window, ((function (self) {
                return function () { self.draw(); };
            })(this)));
        }
    }

    public newGame() {
        this.messageLabel.style.display = 'none'; // hide();
        this.grid.clearGrid();
        this.currentShape = this.newShape();
        // this.score = 0;
        this.rowsCompleted = 0;
        // this.score = 0;
        this.level = -1;
        this.speed = 1000;
        this.phase = Game.gameState.playing;
        // kick off the render loop
        requestAnimFrame.call(window, ((function (self) {
            return function () { self.draw(); };
        })(this)));
        this.incrementLevel(); // will start the game timer & update the labels
        this.emit("update")
    }

    // private updateLabels() {
    //     this.scoreLabel.innerText = this.score.toString();
    //     this.rowsLabel.innerText = this.rowsCompleted.toString();
    //     this.levelLabel.innerText = this.level.toString();
    // }

    private gameTimer() {
        if (this.phase == Game.gameState.playing) {
            const points = this.currentShape.drop();
            if (this.grid.isPosValid(points)) {
                this.currentShape.setPos(points);
            }
            else {
                this.shapeFinished();
            }
        }
        this.emit("update");
    }

    private keyhandler(event: KeyboardEvent) {
        let points;
        if (this.phase == Game.gameState.playing) {
            switch (event.keyCode) {
                case 39: // right
                    points = this.currentShape.moveRight();
                    break;
                case 37: // left
                    points = this.currentShape.moveLeft();
                    break;
                case 38: // up arrow
                    points = this.currentShape.rotate(true);
                    break;
                case 40: // down arrow
                    // erase ourself first
                    points = this.currentShape.drop();
                    while (this.grid.isPosValid(points)) {
                        this.currentShape.setPos(points);
                        points = this.currentShape.drop();
                    }

                    this.shapeFinished();
                    break;
            }

            switch (event.keyCode) {
                case 39: // right
                case 37: // left
                case 38: // up
                    if (this.grid.isPosValid(points)) {
                        this.currentShape.setPos(points);
                    }
                    break;
            }
        }

        if (event.keyCode == 113) { // F2
            this.newGame();
        }
        // else if (event.keyCode == 80) { // P = Pause
        //     this.togglePause();
        // }
        else if (event.keyCode == 70) { // F = Faster
            if ((this.level < 10) && (this.phase == Game.gameState.playing) || (this.phase == Game.gameState.paused)) {
                this.incrementLevel();

            }
        }
    }

    public togglePause() {
        if (this.phase == Game.gameState.paused) {
            this.messageLabel.style.display = 'none'; // hide();
            this.phase = Game.gameState.playing;
            this.draw();// kick the render loop off again
        }
        else if (this.phase == Game.gameState.playing) {
            this.phase = Game.gameState.paused;
            this.showMessage("WAITING FOR PLAYER");
        }
    }

    private showMessage(message: string) {
        this.messageLabel.style.display = 'block'; // show();
        this.messageLabel.innerText = message;
    }

    private incrementLevel() {
        this.level++;
        if (this.level < 10) {
            this.speed = 1000 - (this.level * 100);
            clearTimeout(this.timerToken);
            this.timerToken = setInterval((function (self) {
                return function () { self.gameTimer(); };
            })(this), this.speed);
        }
        // this.updateLabels();
    }

    private shapeFinished() {
        if (this.grid.addShape(this.currentShape)) {
            this.grid.draw(this.currentShape);
            const completed = this.grid.checkRows(this.currentShape); // and erase them
            this.rowsCompleted += completed;
            // this.score += (completed * (this.level + 1) * 10);
            if (this.rowsCompleted > ((this.level + 1) * 10)) {
                this.incrementLevel();
            }
            // this.updateLabels();

            this.currentShape = this.newShape();
        }
        else {
            // game over!
            if (window.console) console.log("Game over");
            this.phase = Game.gameState.gameover;
            this.showMessage("GAME OVER\nPress F2 to Start");
            clearTimeout(this.timerToken);
        }
    }

    public youWin() {
        this.phase = Game.gameState.gameover;
        this.showMessage("YOU WIN!")
    }

    private newShape(): Shape {
        // 7 shapes
        const randomShape = Math.floor(Math.random() * 7);
        let newShape: Shape;
        switch (randomShape) {
            case 0:
                newShape = new LShape(false, this.grid.cols);
                break;
            case 1:
                newShape = new LShape(true, this.grid.cols);
                break;
            case 2:
                newShape = new TShape(this.grid.cols);
                break;
            case 3:
                newShape = new StepShape(false, this.grid.cols);
                break;
            case 4:
                newShape = new StepShape(true, this.grid.cols);
                break;
            case 5:
                newShape = new SquareShape(this.grid.cols);
                break;
            case 6:
                newShape = new StraightShape(this.grid.cols);
                break;
        }
        return newShape;
    }
}