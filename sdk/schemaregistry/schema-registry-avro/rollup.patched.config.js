// Custom configuration for the browser test that addresses the following issues:
// - avsc imports NodeJS's buffers implicitly but the browser does not
//   understand that, so we inject an explicit import to the Buffer polyfill
// - avsc uses NodeJS's streams internally but it seems we do not need that part
//  so we shim it out
// - the util polyfill references process internally but does not depend on the
//   process polyfill, so we inject process

import inject from "@rollup/plugin-inject";
import shim from "rollup-plugin-shim";
import { makeBrowserTestConfig } from "@azure/dev-tool/shared-config/rollup";

export function makeBrowserTestConfigPatchProcess() {
  const config = { ...makeBrowserTestConfig(require("./package.json")) };
  config.plugins.push(
    inject({
      // avsc uses NodeJS's buffers so we inject an import to the browser polyfill one
      exclude: "./**/package.json",
      modules: {
        Buffer: ["buffer", "Buffer"],
        process: "process",
      },
    }),
    // avsc uses NodeJS's internal streams so we shim them there.
    shim({
      stream: `export default {}`,
    })
  );

  return config;
}
