// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Custom configuration for the browser test that addresses the following issues:
// - add cjs namedExports for openTelemetryCommonJs()

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import multiEntry from "@rollup/plugin-multi-entry";
import replace from "@rollup/plugin-replace";
import sourcemaps from "rollup-plugin-sourcemaps";
import shim from "rollup-plugin-shim";
import { makeBrowserTestConfig } from "@azure/dev-tool/shared-config/rollup";

/**
 * Gets the proper configuration needed for rollup's commonJS plugin for @opentelemetry/api.
 *
 * NOTE: this manual configuration is only needed because OpenTelemetry uses an
 * __exportStar downleveled helper function to declare its exports which confuses
 * rollup's automatic discovery mechanism.
 *
 * @returns an object reference that can be `...`'d into your cjs() configuration.
 */
export function openTelemetryCommonJs() {
  const namedExports = {};

  for (const key of ["@opentelemetry/api", "@azure/core-tracing/node_modules/@opentelemetry/api"]) {
    namedExports[key] = [
      "SpanKind",
      "TraceFlags",
      "getSpan",
      "setSpan",
      "SpanStatusCode",
      "getSpanContext",
      "setSpanContext",
    ];
  }

  const releasedOpenTelemetryVersions = ["0.10.2", "1.0.0-rc.0"];

  for (const version of releasedOpenTelemetryVersions) {
    namedExports[
      // working around a limitation in the rollup common.js plugin - it's not able to resolve these modules so the named exports listed above will not get applied. We have to drill down to the actual path.
      `../../../common/temp/node_modules/.pnpm/@opentelemetry+api@${version}/node_modules/@opentelemetry/api/build/src/index.js`
    ] = [
      "SpanKind",
      "TraceFlags",
      "getSpan",
      "setSpan",
      "StatusCode",
      "CanonicalCode",
      "getSpanContext",
      "setSpanContext",
    ];
  }

  return namedExports;
}

function makeBrowserTestConfigPatch() {
  const config = { ...makeBrowserTestConfig(require("./package.json")) };
  config.plugins = [
    multiEntry({ exports: false }),
    sourcemaps(),
    replace({
      delimiters: ["", ""],
      // replace dynamic checks with if (false) since this is for
      // browser only. Rollup's dead code elimination will remove
      // any code guarded by if (isNode) { ... }
      "if (isNode)": "if (false)",
    }),
    shim({
      fs: `export default {}`,
      path: `export default {}`,
    }),
    nodeResolve({
      mainFields: ["module", "browser"],
      preferBuiltins: false,
    }),
    json(),
    cjs({
      namedExports: {
        chai: ["assert"],
        events: ["EventEmitter"],
        ...openTelemetryCommonJs(),
      },
    }),
  ];

  return config;
}

export default makeBrowserTestConfigPatch();
