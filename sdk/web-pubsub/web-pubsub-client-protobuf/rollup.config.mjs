import config from "@azure/dev-tool/shared-config/rollup.js";
const { makeConfig } = config;
import { readFile } from "fs/promises";

const pkg = JSON.parse(await readFile("./package.json", { encoding: "utf-8" }));
export default makeConfig(pkg);
