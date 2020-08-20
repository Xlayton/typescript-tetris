import { Point } from './Point';
import { Shape } from './Shape';

export class LShape extends Shape {
    private leftHanded: boolean;

    constructor(leftHanded: boolean, cols: number) {
        super();
        this.leftHanded = leftHanded;
        if (leftHanded)
            this.fillColor = 'yellow';
        else
            this.fillColor = 'white';

        const x = cols / 2;
        const y = -2;
        this.points = [];

        this.points.push(new Point(x, y - 1));
        this.points.push(new Point(x, y)); // 1 is our base point
        this.points.push(new Point(x, y + 1));
        this.points.push(new Point(x + (leftHanded ? -1 : 1), y + 1));
    }

    public rotate(clockwise: boolean): Point[] {
        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 4;
        const newPoints = [];
        switch (this.rotation) {
            case 0:
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? -1 : 1), this.points[1].y + 1));
                break;
            case 1:
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y + (this.leftHanded ? -1 : 1)));
                break;
            case 2:
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? 1 : -1), this.points[1].y - 1));
                break;
            case 3:
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y + (this.leftHanded ? 1 : -1)));
                break;
        }
        return newPoints;
    }
}