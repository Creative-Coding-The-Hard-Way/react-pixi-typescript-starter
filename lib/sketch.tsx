import React, { ReactNode } from "react";
import * as PIXI from "pixi.js";
import PIXISketch from "./PIXISketch";

export interface SketchProps<T extends PIXISketch> {
  impl: new (renderer: PIXI.Renderer, stage: PIXI.Container) => T;

  /**
   * The CSS class name to use for the Sketch's wrapping div.
   */
  className: string;
}

export interface SketchState {}

function clamp(x: number, min: number, max: number) {
  if (x < min) {
    return min;
  } else if (x > max) {
    return max;
  } else {
    return x;
  }
}

/**
 * @description A Sketch is comprised of an isolated `<div>` and `<canvas>`.
 *              The canvas is automatically resized to match the dimensions of
 *              the owning div so the canvas can be controlled using css.
 */
class Sketch<T extends PIXISketch> extends React.Component<
  SketchProps<T>,
  SketchState
> {
  root: HTMLDivElement | null = null;
  running: boolean = true;
  previousFrameTime: number = 0;
  renderer?: PIXI.Renderer = undefined;
  needsResize: boolean = true;
  observer?: ResizeObserver = undefined;
  stage?: PIXI.Container = undefined;
  sketch?: T;

  constructor(props: SketchProps<T> | Readonly<SketchProps<T>>) {
    super(props);
  }

  componentDidMount() {
    console.log("Mount Pixi.js Sketch");
    this.renderer = new PIXI.Renderer({
      width: 800,
      height: 800,
      background: 0x000000,
    });
    this.root!.appendChild(this.renderer.view as HTMLCanvasElement);

    this.stage = new PIXI.Container();

    this.observer = new ResizeObserver(() => {
      this.needsResize = true;
    });
    this.observer.observe(this.root!);

    this.setup();
    globalThis.requestAnimationFrame(this.animate.bind(this));
  }

  /// The main application loop.
  animate() {
    if (!this.running) {
      return;
    }

    if (this.needsResize) {
      this.resize();
      this.needsResize = false;
    }

    const currentTime = Date.now();
    const delta = clamp(currentTime - this.previousFrameTime, 0, 250);
    this.previousFrameTime = currentTime;
    const deltaFloat = delta / 1000;

    this.update(deltaFloat);

    this.renderer!.render(this.stage!);

    globalThis.requestAnimationFrame(this.animate.bind(this));
  }

  setup() {
    this.sketch = new this.props.impl(this.renderer!, this.stage!);
  }

  update(dt: number) {
    this.sketch!.update(dt);
  }

  resize() {
    const width = this.root!.clientWidth;
    const height = this.root!.clientHeight;
    this.renderer!.resize(width, height);
    this.sketch!.resized(width, height);
  }

  componentWillUnmount() {
    console.log("Unmount Pixi.js Sketch");
    this.running = false;
    this.root!.removeChild(this.renderer!.view as HTMLCanvasElement);
  }

  shouldComponentUpdate(
    _nextProps: Readonly<SketchProps<T>>,
    _nextState: Readonly<SketchState>,
    _nextContext: any
  ): boolean {
    // Never let react update this component.
    return false;
  }

  render(): ReactNode {
    return (
      <div
        className={this.props.className}
        ref={(root) => (this.root = root)}
      ></div>
    );
  }
}

export default Sketch;
