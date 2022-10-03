// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "path";

import * as rollup from "rollup";
import nodeBuiltins from "builtin-modules";

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import nodePolyfills from "rollup-plugin-polyfill-node";
import json from "@rollup/plugin-json";
import multiEntry from "@rollup/plugin-multi-entry";

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveProject, resolveRoot } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { makeOnWarnForTesting, sourcemapsExtra } from "../../config/rollup.base.config";

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
  }
);

export default leafCommand(commandInfo, async (options) => {
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

      await bundle.write({
        file: "dist/index.js",
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

  if (options["browser-test"]) {
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
      input: {
        include: [[basePath, "test", "**", "*.spec.js"].join("/")],
        exclude: [[basePath, "test", "**", "node", "**"].join("/")],
      },
      preserveSymlinks: false,
      plugins: [
        multiEntry({ exports: false }),
        nodeResolve({
          mainFields: ["module", "browser"],
          preferBuiltins: false,
        }),
        ...(options["polyfill-node"] ? [nodePolyfills({ sourceMap: true })] : []),
        cjs({
          dynamicRequireTargets: [globFromStore("chai")],
        }),
        json(),
        sourcemapsExtra(),
      ],
      onwarn: makeOnWarnForTesting(),
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
      });
    } catch (error: any) {
      log.error(error);
      return false;
    }

    log.success("Created browser testing bundle.");
  }

  return true;
});
