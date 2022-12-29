import PIXISketch from "../lib/PIXISketch";
import {
  Sprite,
  Renderer,
  Container,
  Graphics,
  RenderTexture,
  Texture,
} from "pixi.js";
import { proxy } from "valtio";

export const store = proxy<{
  points: number;
  xFrequency: number;
  yFrequency: number;
}>({ points: 10, xFrequency: 1, yFrequency: 1 });

export default class MySketch extends PIXISketch {
  readonly TWO_PI: number = 3.14159 * 2;
  positions: { x: number; y: number }[] = [];
  radius: number = 10;
  t: number = 0;
  nextT: number = 0;
  g: Graphics;
  current: number = 0;
  old: number = 1;
  onScreen: Sprite[];
  renderTarget: RenderTexture[];

  constructor(renderer: Renderer, stage: Container) {
    super(renderer, stage);

    this.renderTarget = [
      RenderTexture.create({
        width: renderer.width,
        height: renderer.height,
      }),
      RenderTexture.create({
        width: renderer.width,
        height: renderer.height,
      }),
    ];
    this.onScreen = [
      Sprite.from(this.renderTarget[0]),
      Sprite.from(this.renderTarget[1]),
    ];

    this.g = new Graphics();
    this.g.position.set(renderer.width / 2, renderer.height / 2);
  }

  override update(dt: number): void {
    this.t += dt;

    const angle = this.t * this.TWO_PI * 0.1;
    const x = Math.cos(angle * store.xFrequency) * this.radius;
    const y = Math.sin(angle * store.yFrequency) * this.radius;

    this.g.clear().lineStyle(2, 0xffffff, 0.01);

    const count = this.positions.length;
    for (let i = 0; i < count; i++) {
      let start = this.positions[i];
      this.g.moveTo(start.x, start.y).lineTo(x, y);
      for (let j = 0; j < count; j++) {
        if (i == j) {
          continue;
        }
        let end = this.positions[j];
        this.g.moveTo(start.x, start.y).lineTo(end.x, end.y);
      }
    }

    if (this.t > this.nextT) {
      this.nextT = this.t + 0.075;
      this.addPosition(x, y);
    }

    [this.old, this.current] = [this.current, this.old];

    let container = new Container();
    this.onScreen[this.old].alpha = 0.99;
    container.addChild(this.onScreen[this.old]);
    container.addChild(this.g);

    this.renderer.render(container, {
      renderTexture: this.renderTarget[this.current],
    });

    this.stage.removeChild(this.onScreen[this.old]);

    this.onScreen[this.current].alpha = 1;
    this.stage.addChild(this.onScreen[this.current]);
  }

  addPosition(x: number, y: number) {
    this.positions.push({ x, y });
    while (this.positions.length > store.points) {
      this.positions.shift();
    }
  }

  override resized(width: number, height: number) {
    this.renderTarget[0].resize(width, height, true);
    this.renderTarget[1].resize(width, height, true);
    this.g.position.set(width / 2, height / 2);
    this.radius = Math.min(width, height) * 0.46;
  }
}
