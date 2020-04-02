import resolve from "rollup-plugin-local-resolve";
export default [
  {
    input: "dist-esm/index.js",
    external: [
      "tslib",
      "uuid/v4",
      "debug",
      "node-abort-controller",
      "node-fetch",
      "priorityqueuejs",
      "semaphore",
      "crypto",
      "fast-json-stable-stringify"
    ],
    output: {
      file: "dist/index.js",
      format: "umd",
      name: "Microsoft.Azure.Cosmos",
      sourcemap: true,
      globals: {
        "fast-json-stable-stringify": "stableStringify",
        "uuid/v4": "uuid",
        "node-abort-controller": "AbortController",
        "node-fetch": "fetch",
        crypto: "crypto",
        tslib: "tslib_1",
        debug: "debugLib",
        priorityqueuejs: "PriorityQueue",
        semaphore: "semaphore"
      }
    },
    plugins: [resolve()],
    onwarn(warning, warn) {
      if (warning.code === "CIRCULAR_DEPENDENCY") {
        throw new Error(warning.message);
      }
      warn(warning);
    }
  }
];
