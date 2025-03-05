import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import shim from "rollup-plugin-shim";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "main"
  },
  plugins: [
    shim({
      fs: `
      export function stat() { }
      export function createReadStream() { }
      export function createWriteStream() { }
    `,
      os: `
      export const type = 1;
      export const release = 1;
    `,
      util: `
        export function promisify() { }
    `
    }),
    resolve({
      preferBuiltins: false,
      mainFields: ["module", "browser"]
    }),
    cjs({
      namedExports: {
        events: ["EventEmitter"]
      }
    }),
    json(),
    typescript()
  ]
};
