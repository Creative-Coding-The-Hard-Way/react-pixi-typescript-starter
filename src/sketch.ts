import PIXISketch from "../lib/PIXISketch";
import { Sprite, Renderer, Container, Texture } from "pixi.js";

export default class MySketch extends PIXISketch {
  sprite: Sprite;
  vel: number[];

  constructor(renderer: Renderer, stage: Container) {
    super(renderer, stage);

    this.sprite = Sprite.from(Texture.WHITE);
    this.sprite.width = 20;
    this.sprite.height = 20;
    this.sprite.x = 200;
    this.sprite.y = 200;

    this.vel = [-100.0, 100.0];

    stage.addChild(this.sprite);
  }

  update(dt: number): void {
    this.sprite.x += this.vel[0] * dt;
    this.sprite.y += this.vel[1] * dt;

    if (this.sprite.x > this.renderer.width) {
      this.sprite.x = this.renderer.width;
      this.vel[0] *= -1;
    }
    if (this.sprite.x < 0) {
      this.sprite.x = 0;
      this.vel[0] *= -1;
    }

    if (this.sprite.y > this.renderer.height) {
      this.sprite.y = this.renderer.height;
      this.vel[1] *= -1;
    }
    if (this.sprite.y < 0) {
      this.sprite.y = 0;
      this.vel[1] *= -1;
    }
  }
}
