import * as PIXI from "pixi.js";

/**
 * An application should extend the PIXI Sketch, overriding methods as desired.
 */
abstract class PIXISketch {
  readonly renderer: PIXI.Renderer;
  readonly stage: PIXI.Container;

  constructor(renderer: PIXI.Renderer, stage: PIXI.Container) {
    this.renderer = renderer;
    this.stage = stage;
  }

  /**
   * @description Called once per frame.
   * @param {number} _dt - the elapsed time in seconds
   */
  update(_dt: number) {}

  /**
   * @description Called once any time the PIXI canvas is resized.
   * @param {number} _width - the width of the resized canvas.
   * @param {number} _height - the height of the resized canvas.
   */
  resized(_width: number, _height: number) {}
}

export default PIXISketch;
