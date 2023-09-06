import { makeConfig } from "@azure/dev-tool/shared-config/rollup";
import * as base from "./rollup.patched.config";

const inputs = makeConfig(require("./package.json"));

if (!process.env.ONLY_NODE) {
  // replace the original test config with a patched one
  inputs[1] = base.makeBrowserTestConfigPatchProcess();
}

export default inputs;
