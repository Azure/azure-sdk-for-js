import config from "@azure/dev-tool/shared-config/rollup.js";
const { makeConfig } = config;
import pkg from "./package.json" assert { type: "json" };

export default makeConfig(pkg);
