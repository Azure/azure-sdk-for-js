// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "path";

import * as rollup from "rollup";
import nodeBuiltins from "builtin-modules";

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-polyfill-node";
import json from "@rollup/plugin-json";
import multiEntry from "@rollup/plugin-multi-entry";
import inject from "@rollup/plugin-inject";

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveProject, resolveRoot } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { makeOnWarnForTesting, sourcemaps } from "../../config/rollup.base.config";

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
    "polyfill-node": {
      kind: "boolean",
      default: true,
      description: "include a polyfill for Node.js builtin modules",
    },
    "inject-node-polyfills": {
      kind: "boolean",
      default: false,
      description: "inject imports for Node.js builtin polyfill modules",
    },
    "ignore-missing-node-builtins": {
      kind: "boolean",
      default: false,
      description: "ignore missing Node.js builtin modules",
    },
  }
);

export default leafCommand(commandInfo, async (options) => {
  const browserTest = options["browser-test"];
  const injectNodePolyfills = options["inject-node-polyfills"];
  const ignoreMissingNodeBuiltins = options["ignore-missing-node-builtins"];
  const polyfillNode = options["polyfill-node"];

  if (injectNodePolyfills && polyfillNode) {
    throw new Error(
      "Cannot use both --inject-node-polyfills and --polyfill-node. Using --inject-node-polyfills is an advanced scenario when you want to have more control on which polyfill libraries to be used."
    );
  }
  if (ignoreMissingNodeBuiltins && !injectNodePolyfills) {
    log.warn(
      "This is probably a mistake. --ignore-missing-node-builtins should only be used with --inject-node-polyfills."
    );
  }
  if (!browserTest && injectNodePolyfills) {
    log.warn(
      "This is probably a mistake. --inject-node-polyfills shouldn't be used if --browser-test is disabled."
    );
  }

  const info = await resolveProject(process.cwd());

  if (!info.packageJson.module) {
    log.error(info.name, "does not specify a `module` field.");
    return false;
  }

  const basePath = path
    .relative(process.cwd(), path.dirname(path.parse(info.packageJson.module).dir))
    .split(path.sep)
    .join("/");

  if (options.production) {
    const baseConfig: rollup.RollupOptions = {
      // Use the package's module field if it has one
      input: info.packageJson.module,
      external: [
        ...nodeBuiltins,
        ...Object.keys(info.packageJson.dependencies),
        ...Object.keys(info.packageJson.devDependencies),
      ],
      preserveSymlinks: false,
      plugins: [nodeResolve(), sourcemaps()],
    };

    try {
      const bundle = await rollup.rollup(baseConfig);
      const cjsOutput = info.packageJson.main ?? info.packageJson.exports?.["."]?.require;
      if (!cjsOutput) {
        throw new Error("Expecting valid main entry");
      }
      await bundle.write({
        file: cjsOutput,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      });
    } catch (error: any) {
      log.error(error);
      return false;
    }

    log.success("Created production CommonJS bundle.");
  }

  if (browserTest) {
    const pnpmStore = path
      .relative(
        process.cwd(),
        path.join(await resolveRoot(), "common", "temp", "node_modules", ".pnpm")
      )
      .split(path.sep)
      .join("/");

    log.debug("Computed PNPM store relative path:", pnpmStore);

    // Get a glob for a package name in the PNPM store
    const globFromStore = (name: string): string =>
      [pnpmStore, name.split("/").join("+"), "@*", "**/*.js"].join("/");

    const browserTestConfig = {
      input: path.join(basePath, "test", "**", "*.spec.js"),
      preserveSymlinks: false,
      plugins: [
        multiEntry({ exports: false, exclude: ["**/test/**/node/**/*.js"] }),
        nodeResolve({
          mainFields: ["module", "browser"],
          preferBuiltins: false,
          browser: true,
        }),
        cjs({
          dynamicRequireTargets: [globFromStore("chai")],
        }),

        ...(injectNodePolyfills
          ? [
              inject({
                modules: {
                  Buffer: ["buffer", "Buffer"],
                  Stream: ["stream", "Stream"],
                  process: "process",
                },
              }),
            ]
          : []),
        ...(polyfillNode ? [nodePolyfills({ sourceMap: true })] : []),
        json(),
        sourcemaps(),
      ],
      onwarn: makeOnWarnForTesting({
        ignoreMissingNodeBuiltins,
      }),
      // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0,
      // rollup started respecting the "sideEffects" field in package.json.  Since
      // our package.json sets "sideEffects=false", this also applies to test
      // code, which causes all tests to be removed by tree-shaking.
      treeshake: false,
    };

    try {
      const browserBundle = await rollup.rollup(browserTestConfig as any);

      await browserBundle.write({
        file: `dist-test/index.browser.js`,
        format: "umd",
        sourcemap: true,
        // Dynamic imports are not supported in `umd` so we have to tell
        // Rollup to inline it. This will inline dynamic imports instead of
        // creating new chunks to create a single bundle. Only possible if a
        // single input is provided. **Note that** this will change the
        // execution order: A module that is only imported
        // dynamically will be executed immediately if the dynamic import is
        // inlined.
        inlineDynamicImports: true,
      });
    } catch (error: any) {
      log.error(error);
      return false;
    }

    log.success("Created browser testing bundle.");
  }

  return true;
});
