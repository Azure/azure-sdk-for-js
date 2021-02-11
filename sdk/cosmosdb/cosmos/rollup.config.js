import resolve from "rollup-plugin-local-resolve";
export default [
  {
    input: "dist-esm/index.js",
    external: [
      "tslib",
      "universal-user-agent",
      "uuid",
      "debug",
      "node-abort-controller",
      "node-fetch",
      "priorityqueuejs",
      "semaphore",
      "crypto",
      "fast-json-stable-stringify",
      "jsbi"
    ],
    output: {
      file: "dist/index.js",
      format: "umd",
      name: "Microsoft.Azure.Cosmos",
      sourcemap: true,
      globals: {
        "universal-user-agent": "universalUserAgent",
        "fast-json-stable-stringify": "stableStringify",
        uuid: "uuid",
        "node-abort-controller": "AbortController",
        "node-fetch": "fetch",
        crypto: "crypto",
        tslib: "tslib_1",
        debug: "debugLib",
        priorityqueuejs: "PriorityQueue",
        semaphore: "semaphore",
        jsbi: "jsbi"
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
