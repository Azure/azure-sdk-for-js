import multi from "rollup-plugin-multi-entry";
import baseConfig from "./rollup.config";
import sourcemaps from "rollup-plugin-sourcemaps";
const [browser] = baseConfig;

browser.input = ["dist-esm/tests/*.js", "dist-esm/tests/browser/*.js"];
browser.output.sourcemap = "inline";
browser.output.file = "dist-test/index.browser.js";
browser.plugins.unshift(multi());
browser.plugins.unshift(sourcemaps());
browser.context = "null";

export default [browser];