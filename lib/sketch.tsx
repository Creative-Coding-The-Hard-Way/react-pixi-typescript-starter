import React from "react";
import P5 from "p5";
import P5Sketch from "./P5Sketch";

export interface SketchProps {
  /**
   * The P5 sketch logic.
   */
  impl: P5Sketch;

  /**
   * The renderer to use when creating the P5 canvas.
   **/
  renderer: P5.RENDERER;

  /**
   * The CSS class name to use for the Sketch's wrapping div.
   */
  className: string;
}

export interface SketchState {}

/**
 * @description A Sketch is comprised of an isolated `<div>` and `<canvas>`.
 *              The canvas is automatically resized to match the dimensions of
 *              the owning div so the canvas can be controlled using css.
 */
class Sketch extends React.Component<SketchProps, SketchState> {
  p5_sketch: P5 | null = null;
  root: HTMLDivElement | null = null;
  observer: ResizeObserver | null = null;
  needsResize: boolean = true;

  constructor(props: SketchProps) {
    super(props);
  }

  setObserver(observer: ResizeObserver) {
    this.observer = observer;
  }

  componentDidMount() {
    console.log("Mount p5 sketch");

    let impl = this.props.impl;
    let root = this.root!;

    this.p5_sketch = new P5((p5: P5) => {
      this.observer = new ResizeObserver(() => {
        this.needsResize = true;
      });
      this.observer.observe(root);

      p5.preload = impl.preload.bind(impl, p5);
      p5.setup = () => {
        p5.createCanvas(200, 200, this.props.renderer);
        impl.setup(p5);
      };
      p5.draw = () => {
        if (this.needsResize) {
          this.needsResize = false;
          let [w, h] = [root.clientWidth, root.clientHeight];
          console.log("resize", w, h);
          p5.resizeCanvas(w, h);
          if (impl.canvasResized) {
            impl.canvasResized(p5, w, h);
          }
        }
        impl.draw(p5);
      };

      if (impl.deviceMoved) {
        p5.deviceMoved = impl.deviceMoved.bind(impl, p5);
      }
      if (impl.deviceTurned) {
        p5.deviceTurned = impl.deviceTurned.bind(impl, p5);
      }
      if (impl.deviceShaken) {
        p5.deviceShaken = impl.deviceShaken.bind(impl, p5);
      }
      if (impl.keyPressed) {
        p5.keyPressed = impl.keyPressed.bind(impl, p5);
      }
      if (impl.keyReleased) {
        p5.keyReleased = impl.keyReleased.bind(impl, p5);
      }
      if (impl.keyTyped) {
        p5.keyTyped = impl.keyTyped.bind(impl, p5);
      }
      if (impl.mouseMoved) {
        p5.mouseMoved = impl.mouseMoved.bind(impl, p5);
      }
      if (impl.mouseDragged) {
        p5.mouseDragged = impl.mouseDragged.bind(impl, p5);
      }
      if (impl.mousePressed) {
        p5.mousePressed = impl.mousePressed.bind(impl, p5);
      }
      if (impl.mouseReleased) {
        p5.mouseReleased = impl.mouseReleased.bind(impl, p5);
      }
      if (impl.mouseClicked) {
        p5.mouseClicked = impl.mouseClicked.bind(impl, p5);
      }
      if (impl.doubleClicked) {
        p5.doubleClicked = impl.doubleClicked.bind(impl, p5);
      }
      if (impl.mouseWheel) {
        p5.mouseWheel = impl.mouseWheel.bind(impl, p5);
      }
      if (impl.touchStarted) {
        p5.touchStarted = impl.touchStarted.bind(impl, p5);
      }
      if (impl.touchMoved) {
        p5.touchMoved = impl.touchMoved.bind(impl, p5);
      }
      if (impl.touchEnded) {
        p5.touchEnded = impl.touchEnded.bind(impl, p5);
      }
      return p5;
    }, root);
  }

  componentWillUnmount() {
    console.log("Unmount p5 sketch");
    if (this.observer != null) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.p5_sketch != null) {
      this.p5_sketch.remove();
      this.p5_sketch = null;
    }
  }

  shouldComponentUpdate(
    _nextProps: Readonly<SketchProps>,
    _nextState: Readonly<SketchState>,
    _nextContext: any
  ): boolean {
    // Never let react update this component.
    return false;
  }

  render(): React.ReactNode {
    return (
      <div
        className={this.props.className}
        ref={(root) => (this.root = root)}
      />
    );
  }
}

export default Sketch;
