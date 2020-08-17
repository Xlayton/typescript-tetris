import { Point } from './Point';
import { Shape } from './Shape';

export class Grid {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private rows: number;
    public cols: number;
    public blockSize: number;
    private blockColor: any[][];
    public backColor: any;
    private xOffset: number;
    private yOffset: number;

    constructor(rows: number, cols: number, blockSize: number, backColor: any, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.blockSize = blockSize;
        this.blockColor = new Array(rows);
        this.backColor = backColor;
        this.cols = cols;
        this.rows = rows;
        for (let r = 0; r < rows; r++) {
            this.blockColor[r] = new Array(cols);
        }
        this.xOffset = 20;
        this.yOffset = 20;
    }

    public draw(shape: Shape) {
        this.paintShape(shape, shape.fillColor);
    }

    public erase(shape: Shape) {
        this.paintShape(shape, this.backColor);
    }

    private paintShape(shape: Shape, color: string) {
        shape.points.forEach(p => this.paintSquare(p.y, p.x, color));
    }

    public getPreferredSize(): Point {
        return new Point(this.blockSize * this.cols, this.blockSize * this.rows);
    }

    // check the set of points to see if they are all free
    public isPosValid(points: Point[]) {
        let valid: boolean = true;
        for (const point of points) {
            if ((point.x < 0) ||
                (point.x >= this.cols) ||
                (point.y >= this.rows)) {
                valid = false;
                break;
            }
            if (point.y >= 0) {
                if (this.blockColor[point.y][point.x] !== this.backColor) {
                    valid = false;
                    break;
                }
            }
        }
        return valid;
    }

    public addShape(shape: Shape) {
        for (const point of shape.points) {
            if (point.y < 0) {
                return false;
            }
            this.blockColor[point.y][point.x] = shape.fillColor;
        }
        return true;
    }

    public eraseGrid() {
        this.context.fillStyle = this.backColor;
        const width = this.cols * this.blockSize;
        const height = this.rows * this.blockSize;

        this.context.fillRect(this.xOffset, this.yOffset, width, height);
    }

    public clearGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.blockColor[row][col] = this.backColor;
            }
        }
        this.eraseGrid();
    }

    private paintSquare(row: number, col: number, color: string) {
        if (row >= 0) { // don't paint rows that are above the grid
            this.context.fillStyle = color;
            this.context.fillRect(this.xOffset + col * this.blockSize, this.yOffset + row * this.blockSize, this.blockSize - 1, this.blockSize - 1);
        }
    }

    public drawGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.blockColor[row][col] !== this.backColor) {
                    this.paintSquare(row, col, this.blockColor[row][col]);
                }
            }
        }
    }

    public paint() {
        this.eraseGrid();
        this.drawGrid();
    }

    // only the rows in last shape could have been filled
    public checkRows(lastShape: Shape) {
        let rowMin = lastShape.points[0].y;
        let rowMax = lastShape.points[0].y;
        let rowComplete;
        let rowsRemoved = 0;
        for (let i = 1; i < lastShape.points.length; i++) {
            if (lastShape.points[i].y < rowMin) {
                rowMin = lastShape.points[i].y;
            }
            if (lastShape.points[i].y > rowMax) {
                rowMax = lastShape.points[i].y;
            }
        }
        if (rowMin < 0) {
            rowMin = 0;
        }

        while (rowMax >= rowMin) {
            rowComplete = true;
            for (let col = 0; col < this.cols; col++) {
                if (this.blockColor[rowMax][col] === this.backColor) {
                    rowComplete = false;
                    break;
                }
            }
            if (rowComplete) {
                rowsRemoved++;
                // shuffle down, stay on this row
                for (let r = rowMax; r >= 0; r--) {
                    for (let col = 0; col < this.cols; col++) {
                        if (r > 0)
                            this.blockColor[r][col] = this.blockColor[r - 1][col];
                        else
                            this.blockColor[r][col] = this.backColor;
                    }
                }
                rowMin++;
            }
            else {
                // move up a row
                rowMax--;
            }
        }

        if (rowsRemoved > 0) {
            this.eraseGrid();
            this.paint();
        }
        return rowsRemoved;
    }
}