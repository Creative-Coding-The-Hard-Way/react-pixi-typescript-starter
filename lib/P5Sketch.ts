import P5 from "p5";

export default abstract class P5Sketch {
  /**
   * @description The P5.js preload function. Useful for synchronously loading
   *              resources before the sketch begins.
   *
   * @see https://p5js.org/reference/#/p5/preload
   */
  preload(_p: P5): void {}

  /**
   * @description Setup the P5.js sketch. This method runs once right as the
   *              sketch begins.
   * @see https://p5js.org/reference/#/p5/setup
   */
  setup(_p: P5): void {}

  /**
   * @description Draw a frame. This method is called for each animation frame
   *              unless the P5 `noLoop()` function is called to stop the
   *              sketch.
   * @see https://p5js.org/reference/#/p5/draw
   */
  draw(_p: P5): void {}

  // ------------------------------------------------------------------------//
  // Event Handlers                                                          //
  // ------------------------------------------------------------------------//

  /**
   * @description Called by the sketch when the canvas element is resized.
   * @param {P5} _p - the P5 library/sketch instance.
   * @param {number} _width - The width of the canvas.
   * @param {number} _height - The height of the canvas.
   */
  canvasResized?: (_p: P5, _width: number, _height: number) => void;

  /**
   * @description Called when the device is moved by more than the threshold
   *              value along the X, Y, or Z axis.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/deviceMoved
   */
  deviceMoved?: (_p: P5) => void;

  /**
   * @description Called when the device rotates by more than 90 degrees
   *              continuously.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/deviceTurned
   */
  deviceTurned?: (_p: P5) => void;

  /**
   * @description called when the device total acceleration changes of
   *              accelerationX and accelerationY values is more than the
   *              threshold value.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/deviceShaken
   */
  deviceShaken?: (_p: P5) => void;

  /**
   * @description Called once every time a key is pressed.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/keyPressed
   * @return {boolean | void} returning false will block the browser's default
   *         behavior when handling key press events.
   */
  keyPressed?: (_p: P5) => boolean | void;

  /**
   * @description Called once every time a key is released.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/keyReleased
   * @return {boolean | void} returning false will block the browser's default
   *         behavior when handling key press events.
   */
  keyReleased?: (_p: P5) => boolean | void;

  /**
   * @description Called once every time a key is pressed, but action keys such
   *              as Backspace, Delete, Ctrl, Shift, and Alt are ignored.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/keyTyped
   * @return {boolean | void} returning false will block the browser's default
   *         behavior when handling key press events.
   */
  keyTyped?: (_p: P5) => boolean | void;

  /**
   * @description Called every time the mouse moves and a mouse button is not
   *              pressed.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/mouseMoved
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  mouseMoved?: (_p: P5) => boolean | void;

  /**
   * @description Called every time the mouse moves and a mouse button is
   *              pressed.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/mouseDragged
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  mouseDragged?: (_p: P5) => boolean | void;

  /**
   * @description Called once after every time a mouse button is pressed.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/mousePressed
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  mousePressed?: (_p: P5) => boolean | void;

  /**
   * @description Called once after every time a mouse button is released.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/mouseReleased
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  mouseReleased?: (_p: P5) => boolean | void;

  /**
   * @description Called once after every time a mouse button has been pressed
   *              and then released.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/mouseClicked
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  mouseClicked?: (_p: P5) => boolean | void;

  /**
   * @description Called once after every time an event listener detects a
   *              dblclick event.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/doubleClicked
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  doubleClicked?: (_p: P5) => boolean | void;

  /**
   * @description Called every time a vertical mouse wheel event is detected.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/mouseWheel
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  mouseWheel?: (_p: P5) => boolean | void;

  /**
   * @description Called once after every time a touch is registered.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/mouseWheel
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  touchStarted?: (_p: P5) => boolean | void;

  /**
   * @description Called every time a touch move event is registered.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/mouseWheel
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  touchMoved?: (_p: P5) => boolean | void;

  /**
   * @description Called every time a touch ends.
   * @param {P5} _p - the P5 library/sketch instance.
   * @see https://p5js.org/reference/#/p5/mouseWheel
   * @return {boolean | void} returning false will overide the browser's
   *         default behavior when handling mouse events.
   */
  touchEnded?: (_p: P5) => boolean | void;
}
