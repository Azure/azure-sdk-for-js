import { makeConfig } from "@azure/dev-tool/shared-config/rollup";
import * as base from "./rollup.webworker.config";

const inputs = makeConfig(require("./package.json"));

if (!process.env.ONLY_NODE) {
  inputs.push(base.webworkerConfig());
}

export default inputs;
