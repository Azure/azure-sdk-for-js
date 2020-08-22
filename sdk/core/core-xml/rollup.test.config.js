import * as base from "./rollup.base.config";

const inputs = [];

if (!process.env.ONLY_BROWSER) {
  inputs.push(base.nodeConfig(true));
}

if (!process.env.ONLY_NODE) {
  inputs.push(base.browserConfig(true));
}

export default inputs;
