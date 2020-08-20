import { Point } from './Point';
import { Shape } from './Shape';

export class StraightShape extends Shape {
    constructor(cols: number) {
        super();
        this.fillColor = 'blue';
        const x = cols / 2;
        const y = -2;
        this.points = [];
        this.points.push(new Point(x, y - 2));
        this.points.push(new Point(x, y - 1));
        this.points.push(new Point(x, y)); // point 2 is our base point
        this.points.push(new Point(x, y + 1));
    }

    public rotate(clockwise: boolean): Point[] {
        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 2;
        const newPoints = [];
        switch (this.rotation) {
            case 0:
                newPoints[0] = new Point(this.points[2].x, this.points[2].y - 2);
                newPoints[1] = new Point(this.points[2].x, this.points[2].y - 1);
                newPoints[2] = new Point(this.points[2].x, this.points[2].y);
                newPoints[3] = new Point(this.points[2].x, this.points[2].y + 1);
                break;
            case 1:
                newPoints[0] = new Point(this.points[2].x + 2, this.points[2].y);
                newPoints[1] = new Point(this.points[2].x + 1, this.points[2].y);
                newPoints[2] = new Point(this.points[2].x, this.points[2].y);
                newPoints[3] = new Point(this.points[2].x - 1, this.points[2].y);
                break;
        }
        return newPoints;
    }
}