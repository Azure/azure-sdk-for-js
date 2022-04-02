import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import shim from "rollup-plugin-shim";

export default {
  input: "./test/playwright/rollup/src/index.ts",
  output: {
    file: "test/playwright/rollup/dist/index.js",
    format: "umd",
    name: "main",
  },
  plugins: [
    shim({}),
    resolve({
      preferBuiltins: false,
      mainFields: ["module", "browser"],
    }),
    cjs(),
    json(),
    typescript(),
  ],
};
