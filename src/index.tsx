import "normalize.css";

import React, { Profiler } from "react";
import { createRoot } from "react-dom/client";
import Sketch from "../lib/sketch";
import * as appCssClasses from "./index.module.css";
import MySketch, { store } from "./sketch";
import { useSnapshot } from "valtio";

function App() {
  const snap = useSnapshot(store);
  return (
    <div className={appCssClasses.mainAppDisplay}>
      <Profiler
        id="MainApp"
        onRender={(id: string, phase: string, actualDuration: number) => {
          console.log("Profiler update:", id, phase, actualDuration);
        }}
      >
        <Sketch
          impl={new MySketch()}
          className={appCssClasses.sketchArea}
          renderer="p2d"
        ></Sketch>
        <div className={appCssClasses.controlPanelArea}>
          <div>
            <p>FPS: {Math.floor(snap.fps * 10) / 10}</p>
          </div>

          <div>
            <label htmlFor="xFrequency">X Frequency: {snap.xFrequency}</label>
            <br />
            <input
              type="range"
              name="volume"
              value={snap.xFrequency}
              min="0.5"
              max="5"
              step="0.2"
              onChange={(event) => {
                store.xFrequency = parseFloat(event.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="yFrequency">Y Frequency: {snap.yFrequency}</label>
            <br />
            <input
              type="range"
              name="volume"
              value={snap.yFrequency}
              min="0.5"
              max="5"
              step="0.2"
              onChange={(event) => {
                store.yFrequency = parseFloat(event.target.value);
              }}
            />
          </div>

          <button onClick={() => (store.needsClear = true)}>
            Clear Screen
          </button>
        </div>
      </Profiler>
    </div>
  );
}

const container = document.getElementById("mainApp");
const root = createRoot(container!);
root.render(React.createElement(App));

export {};
