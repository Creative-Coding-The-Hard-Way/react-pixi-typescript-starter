import P5Sketch from "../lib/P5Sketch";
import P5 from "p5";

import { proxy } from "valtio";

export const store = proxy<{
  yFrequency: number;
  xFrequency: number;
  needsClear: boolean;
  fps: number;
}>({ yFrequency: 1.7, xFrequency: 2.1, needsClear: false, fps: 60 });

export default class MySketch extends P5Sketch {
  radius: number = 100;
  points: { x: number; y: number }[] = [];

  currentPoint(p: P5): { x: number; y: number } {
    const t = p.millis() / 1000;
    const xangle = (store.xFrequency * (t * p.TWO_PI)) / 2;
    const yangle = (store.yFrequency * (t * p.TWO_PI)) / 2;
    return { x: p.cos(xangle) * this.radius, y: p.sin(yangle) * this.radius };
  }

  resetPoints(p: P5): void {
    let point = this.currentPoint(p);
    this.points = [];
    for (let i = 0; i < 10; i++) {
      this.points.push(point);
    }
  }

  addPoint(p: P5): void {
    let point = this.currentPoint(p);
    this.points.push(point);
    this.points.shift();
  }

  setup(p: P5): void {
    p.stroke(255, 255, 255, 15);
  }

  draw(p: P5): void {
    if (p.frameCount % 30 == 0) {
      store.fps = p.frameRate();
    }

    if (store.needsClear) {
      p.background(0, 0, 0, 255);
      this.resetPoints(p);
      store.needsClear = false;
    } else {
      p.background(0, 0, 0, 5);
    }
    this.addPoint(p);

    p.translate(p.width / 2, p.height / 2);

    for (let i = 0; i < this.points.length; i++) {
      let start = this.points[i];
      for (let j = 0; j < this.points.length; j++) {
        if (i == j) continue;
        let end = this.points[j];
        p.line(start.x, start.y, end.x, end.y);
      }
    }
  }

  canvasResized = (p: P5, w: number, h: number) => {
    p.background(0);
    this.radius = p.min(w, h) / 2.2;
    this.resetPoints(p);
  };
}
