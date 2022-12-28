import "normalize.css";

import React, { Profiler } from "react";
import { createRoot } from "react-dom/client";
import * as styles from "./index.module.css";
import Sketch from "../lib/sketch";
import MySketch from "./sketch";

function App() {
  return (
    <div>
      <Profiler
        id="MainProfile"
        onRender={(id, phase, duration) => {
          console.log(`Profiler onRender() ${id} ${phase} ${duration}ms`);
        }}
      >
        <Sketch className={styles.mainAppDisplay} impl={MySketch}></Sketch>
      </Profiler>
    </div>
  );
}

const container = document.getElementById("mainApp");
const root = createRoot(container!);
root.render(React.createElement(App));

export {};
