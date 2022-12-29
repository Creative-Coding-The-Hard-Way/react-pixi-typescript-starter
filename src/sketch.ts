import PIXISketch from "../lib/PIXISketch";
import { Sprite, Renderer, Container, Texture } from "pixi.js";
import { proxy } from "valtio";

export const store = proxy<{
  scale: number;
}>({ scale: 1 });

export default class MySketch extends PIXISketch {
  sprite: Sprite;
  vel: number[];

  constructor(renderer: Renderer, stage: Container) {
    super(renderer, stage);

    renderer.background.color = 0x555566;

    this.sprite = stage.addChild(Sprite.from(Texture.WHITE));
    this.sprite.width = 20;
    this.sprite.height = 20;
    this.sprite.x = 200;
    this.sprite.y = 200;

    this.vel = [-100.0, 100.0];
  }

  update(dt: number): void {
    this.sprite.scale.x = store.scale;
    this.sprite.scale.y = store.scale;

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
