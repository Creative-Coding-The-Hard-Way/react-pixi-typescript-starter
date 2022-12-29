import "normalize.css";

import React, { Profiler } from "react";
import { createRoot } from "react-dom/client";
import * as styles from "./index.module.css";
import Sketch from "../lib/sketch";
import MySketch, { store } from "./sketch";
import { useSnapshot } from "valtio";

function App() {
  const snap = useSnapshot(store);
  return (
    <div>
      <Profiler
        id="MainProfile"
        onRender={(id, phase, duration) => {
          console.log(`Profiler onRender() ${id} ${phase} ${duration}ms`);
        }}
      >
        <div className={styles.controlPanel}>
          <label htmlFor="scaleSlider">
            Sprite Scale {Math.round(snap.scale * 100) / 100}
          </label>
          <input
            id="scaleSlider"
            type="range"
            min="0.5"
            max="10"
            step="0.05"
            value={snap.scale}
            onChange={(event) => {
              store.scale = parseFloat(event.target.value);
            }}
          />
        </div>

        <Sketch className={styles.mainAppDisplay} impl={MySketch}></Sketch>
      </Profiler>
    </div>
  );
}

const container = document.getElementById("mainApp");
const root = createRoot(container!);
root.render(React.createElement(App));

export {};
