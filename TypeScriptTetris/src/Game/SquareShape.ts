import { Point } from './Point';
import { Shape } from './Shape';

export class SquareShape extends Shape {
    constructor(cols: number) {
        super();
        this.fillColor = 'green';
        const x = cols / 2;
        const y = -2;
        this.points = [];
        this.points.push(new Point(x, y));
        this.points.push(new Point(x + 1, y));
        this.points.push(new Point(x, y + 1));
        this.points.push(new Point(x + 1, y + 1));
    }

    public rotate(clockwise: boolean): Point[] {
        // this shape does not rotate
        return this.points;
    }
}