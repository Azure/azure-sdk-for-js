import inject from "@rollup/plugin-inject";
import shim from "rollup-plugin-shim";
import { makeBrowserTestConfig } from "@azure/dev-tool/shared-config/rollup";

export function makeBrowserTestConfigPatchProcess() {
  const config = { ...makeBrowserTestConfig(require("./package.json")) };
  config.plugins.push(
    inject({
      exclude: "./**/package.json",
      modules: {
        process: "process",
      },
    })
  );

  return config;
}
