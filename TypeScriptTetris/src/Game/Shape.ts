import { Point } from './Point'

export class Shape {
    public points: Point[]; // points that make up this shape
    public rotation = 0; // what rotation 0,1,2,3
    public fillColor: string;

    private move(x: number, y: number): Point[] {
        const newPoints = [];

        for (const point of this.points) {
            newPoints.push(new Point(point.x + x, point.y + y));
        }
        return newPoints;
    }

    public setPos(newPoints: Point[]) {
        this.points = newPoints;
    }

    // return a set of points showing where this shape would be if we dropped it one
    public drop(): Point[] {
        return this.move(0, 1);
    }

    // return a set of points showing where this shape would be if we moved left one
    public moveLeft(): Point[] {
        return this.move(-1, 0);
    }

    // return a set of points showing where this shape would be if we moved right one
    public moveRight(): Point[] {
        return this.move(1, 0);
    }

    // override these
    // return a set of points showing where this shape would be if we rotate it
    public rotate(clockwise: boolean): Point[] {
        throw new Error("This method is abstract");
    }
}