// Custom configuration for the browser test that addresses the following issues:
// - avsc imports NodeJS's buffers implicitly but the browser does not
//   understand that, so we inject an explicit import to the Buffer polyfill
// - avsc uses NodeJS's streams internally but it seems we do not need that part
//  so we shim it out
// - the util polyfill references process internally but does not depend on the
//   process polyfill, so we rewrite that line that references process

import replace from "@rollup/plugin-replace";
import inject from "@rollup/plugin-inject";
import shim from "rollup-plugin-shim";
import { makeBrowserTestConfig } from "@azure/dev-tool/shared-config/rollup";

export function makeBrowserTestConfigPatchProcess() {
  const config = { ...makeBrowserTestConfig() };
  config.plugins.push(
    replace({
      delimiters: ["", ""],
      preventAssignment: true,
      values: {
        // the util polyfill does not explicitly depend on the process polyfill so
        // we replace that util's line
        // see https://github.com/browserify/node-util/issues/43
        "if (process.env.NODE_DEBUG)": "if (false)"
      }
    }),
    inject({
      // avsc uses NodeJS's buffers so we inject an import to the browser polyfill one
      exclude: "./**/package.json",
      modules: {
        Buffer: ["buffer", "Buffer"]
      }
    }),
    // avsc uses NodeJS's internal streams so we shim them there.
    shim({
      stream: `export default {}`
    })
  );

  return config;
}
