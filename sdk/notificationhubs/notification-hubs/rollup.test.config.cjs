const cjs = require("@rollup/plugin-commonjs");
const inject = require("@rollup/plugin-inject");
const json = require("@rollup/plugin-json");
const multiEntry = require("@rollup/plugin-multi-entry");
const nodeResolve = require("@rollup/plugin-node-resolve");
const replace = require("@rollup/plugin-replace");
const shim = require("rollup-plugin-shim");
const typescript = require("@rollup/plugin-typescript");
const { makeConfig, makeBrowserTestConfig } = require("@azure/dev-tool/shared-config/rollup");

const inputs = makeConfig(require("./package.json"));

if (!process.env.ONLY_NODE) {
  // event-hubs has many dependencies that we do not
  // want to bring into the shared rollup config, so
  // replace the original test config with a patched one
  inputs[1] = makeBrowserTestConfigPatch();
}

function makeBrowserTestConfigPatch() {
  const config = { ...makeBrowserTestConfig(require("./package.json")) };
  config.plugins = [
    multiEntry({ exports: false }),
    typescript({
      exclude: ["test/**/*.spec.ts"],
    }),
    replace({
      preventAssignment: true,
      delimiters: ["", ""],
      // replace dynamic checks with if (false) since this is for
      // browser only. Rollup's dead code elimination will remove
      // any code guarded by if (isNode) { ... }
      "if (isNode)": "if (false)",
      "if (!isNode)": "if (true)",
    }),
    // fs, net, and tls are used by rhea and need to be shimmed
    // dotenv doesn't work in the browser, so replace it with a no-op function
    shim({
      dotenv: `export function config() { }`,
    }),
    nodeResolve({
      mainFields: ["module", "browser"],
      preferBuiltins: false,
    }),
    cjs({
      namedExports: {
        chai: ["should", "assert"],
      },
    }),
    inject({
      modules: {
        process: "process",
      },
      exclude: ["./**/package.json"],
    }),
    json(),
  ];

  return config;
}

export default inputs;
