import rollup from "rollup";
import nodeResolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";

/**
 * @type {rollup.RollupFileOptions}
 */
const config = {
  input: "./esm/index.js",
  external: [
    "@azure/core-http",
    "@azure/core-arm"
  ],
  output: {
    file: "./dist/app-configuration.js",
    format: "umd",
    name: "Azure.AppConfig",
    sourcemap: true,
    globals: {
      "@azure/core-http": "coreHttp",
      "@azure/core-arm": "coreArm"
    }
  },
  plugins: [
    nodeResolve({ module: true }),
    sourcemaps()
  ]
};

export default config;
