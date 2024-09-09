import config from "@azure/dev-tool/shared-config/rollup.js";
import { readFile } from "node:fs/promises";

const { makeConfig } = config;
const pkg = JSON.parse(await readFile("./package.json", { encoding: "utf-8" }));
export default makeConfig(pkg, { disableBrowserBundle: true });
