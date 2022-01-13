// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as rollup from "rollup";
import nodeBuiltins from "builtin-modules";

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import json from "@rollup/plugin-json";
import multiEntry from "@rollup/plugin-multi-entry";

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveProject } from "../../util/resolveProject";
import { makeOnWarnForTesting } from "../../config/rollup.base.config";
import { createPrinter } from "../../util/printer";

const log = createPrinter("bundle");

export const commandInfo = makeCommandInfo(
  "bundle",
  "bundle a package using the default settings",
  {
    production: {
      kind: "boolean",
      default: true,
      description: "build a CommonJS production bundle",
    },
    "browser-test": {
      kind: "boolean",
      default: true,
      description: "build a bundle for browser testing",
    },
  }
);

export default leafCommand(commandInfo, async ({ production, "browser-test": browserTest }) => {
  const info = await resolveProject(process.cwd());

  if (production) {
    const baseConfig: rollup.RollupOptions = {
      // Use the package's module field if it has one
      input: info.packageJson["module"] ?? "dist-esm/src/index.js",
      external: [
        ...nodeBuiltins,
        ...Object.keys(info.packageJson.dependencies),
        ...Object.keys(info.packageJson.devDependencies),
      ],
      preserveSymlinks: false,
      plugins: [sourcemaps(), nodeResolve(), cjs()],
    };

    const bundle = await rollup.rollup(baseConfig);

    await bundle.write({ file: "dist/index.js", format: "cjs", sourcemap: true });

    log.success("Created production CommonJS bundle.");
  }

  if (browserTest) {
    const browserTestConfig = {
      input: {
        include: ["dist-esm/test/**/*.spec.js"],
        exclude: ["dist-esm/test/**/node/**"],
      },
      preserveSymlinks: false,
      plugins: [
        multiEntry({ exports: false }),
        nodeResolve({
          mainFields: ["module", "browser"],
          preferBuiltins: false,
        }),
        cjs({
          dynamicRequireTargets: ["**/*/node_modules/**/chai@*/**/*"],
        }),
        json(),
        sourcemaps(),
        //viz({ filename: "dist-test/browser-stats.html", sourcemap: true })
      ],
      onwarn: makeOnWarnForTesting(),
      // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0,
      // rollup started respecting the "sideEffects" field in package.json.  Since
      // our package.json sets "sideEffects=false", this also applies to test
      // code, which causes all tests to be removed by tree-shaking.
      treeshake: false,
    };

    const browserBundle = await rollup.rollup(browserTestConfig as any);

    await browserBundle.write({
      file: `dist-test/index.browser.js`,
      format: "umd",
      sourcemap: true,
    });

    log.success("Created browser testing bundle.");
  }

  return true;
});
