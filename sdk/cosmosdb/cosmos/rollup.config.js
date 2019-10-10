import resolve from "rollup-plugin-local-resolve";
export default [
  {
    input: "dist-esm/index.js",
    external: [
      "tslib",
      "@azure/cosmos-sign",
      "universal-user-agent",
      "uuid/v4",
      "debug",
      "@azure/abort-controller",
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
        "universal-user-agent": "universalUserAgent",
        "@azure/cosmos-sign": "cosmosSign",
        "fast-json-stable-stringify": "stableStringify",
        "uuid/v4": "uuid",
        "@azure/abort-controller": "AbortController",
        "node-fetch": "fetch",
        crypto: "crypto",
        tslib: "tslib_1",
        debug: "debugLib",
        priorityqueuejs: "PriorityQueue",
        semaphore: "semaphore"
      }
    },
    plugins: [resolve()]
  }
];
