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
          <label htmlFor="xFrequency">
            xFrequency {Math.round(snap.xFrequency * 100) / 100}
          </label>
          <input
            id="xFrequency"
            type="range"
            min="0.5"
            max="5"
            step="0.05"
            value={snap.xFrequency}
            onChange={(event) => {
              store.xFrequency = parseFloat(event.target.value);
            }}
          />

          <label htmlFor="yFrequency">
            yFrequency {Math.round(snap.yFrequency * 100) / 100}
          </label>
          <input
            id="yFrequency"
            type="range"
            min="0.5"
            max="5"
            step="0.05"
            value={snap.yFrequency}
            onChange={(event) => {
              store.yFrequency = parseFloat(event.target.value);
            }}
          />

          <label htmlFor="pointsCount">points {snap.points}</label>
          <input
            id="pointsCount"
            type="range"
            min="4"
            max="20"
            step="1"
            value={snap.points}
            onChange={(event) => {
              store.points = Math.round(parseFloat(event.target.value));
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
