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
      "node-abort-controller",
      "node-fetch",
      "atob",
      "binary-search-bounds",
      "priorityqueuejs",
      "semaphore",
      "crypto-hash",
      "fast-json-stable-stringify"
    ],
    output: {
      file: "dist/index.js",
      format: "umd",
      name: "Microsoft.Azure.Cosmos",
      sourcemap: true
    },
    plugins: [resolve()]
  }
];
