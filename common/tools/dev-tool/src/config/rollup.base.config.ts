// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LoadResult,
  PluginContext,
  RollupOptions,
  RollupWarning,
  WarningHandlerWithDefault,
} from "rollup";

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import multiEntry from "@rollup/plugin-multi-entry";
import json from "@rollup/plugin-json";
import * as path from "path";
import { readFile } from "node:fs/promises";

import nodeBuiltins from "builtin-modules";
import { createPrinter } from "../util/printer";

const { debug } = createPrinter("rollup.base.config");

interface PackageJson {
  name: string;
  module: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

// #region Warning Handler

/**
 * A function that can determine whether a rollup warning should be ignored. If
 * the function returns `true`, then the warning will not be displayed.
 */
export type WarningInhibitor = (warning: RollupWarning) => boolean;

function matchesPathSegments(str: string | undefined, segments: string[]): boolean {
  return !str ? false : str.includes(segments.join("/")) || str.includes(segments.join("\\"));
}

function ignoreNiseSinonEval(warning: RollupWarning): boolean {
  return (
    warning.code === "EVAL" &&
    (matchesPathSegments(warning.id, ["node_modules", "nise"]) ||
      matchesPathSegments(warning.id, ["node_modules", "sinon"]))
  );
}

function ignoreChaiCircularDependency(warning: RollupWarning): boolean {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    matchesPathSegments(warning.ids?.[0], ["node_modules", "chai"])
  );
}

function ignoreRheaPromiseCircularDependency(warning: RollupWarning): boolean {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    matchesPathSegments(warning.ids?.[0], ["node_modules", "rhea-promise"])
  );
}

function ignoreOpenTelemetryThisIsUndefined(warning: RollupWarning): boolean {
  return (
    warning.code === "THIS_IS_UNDEFINED" &&
    matchesPathSegments(warning.id, ["node_modules", "@opentelemetry", "api"])
  );
}

/**
 * We ignore these warnings because some packages explicitly browser-map node builtins to `false`. Rollup will then
 * complain that node-resolve's empty module does not export symbols from them, but as long as the package doesn't
 * actually use those symbols at runtime in the browser tests, it should be fine.
 */
function ignoreMissingExportsFromEmpty(warning: RollupWarning): boolean {
  return (
    // I absolutely cannot explain why, but node-resolve's internal module ID for empty.js begins with a null byte.
    warning.code === "MISSING_EXPORT" && warning.exporter?.trim() === "\0node-resolve:empty.js"
  );
}

function ignoreExternalModules(warning: RollupWarning): boolean {
  return (
    (warning.code === "MISSING_GLOBAL_NAME" && nodeBuiltins.includes(warning.id!)) ||
    (warning.code === "UNRESOLVED_IMPORT" && nodeBuiltins.includes(warning.exporter!)) ||
    warning.code === "MISSING_NODE_BUILTINS"
  );
}

function createWarningInhibitors({ ignoreMissingNodeBuiltins }: MakeOnWarnForTestingOptions = {}): Array<(warning: RollupWarning) => boolean> {return [
  ignoreChaiCircularDependency,
  ignoreRheaPromiseCircularDependency,
  ignoreNiseSinonEval,
  ignoreOpenTelemetryThisIsUndefined,
  ignoreMissingExportsFromEmpty,
  ...ignoreMissingNodeBuiltins ? [ignoreExternalModules] : [],
];
}

interface MakeOnWarnForTestingOptions {
  ignoreMissingNodeBuiltins?: boolean;
}

/**
 * Construct a warning handler for the shared rollup configuration
 * that ignores certain warnings that are not relevant to testing.
 */
export function makeOnWarnForTesting(opts: MakeOnWarnForTestingOptions = {}): (warning: RollupWarning, warn: WarningHandlerWithDefault) => void {
  const warningInhibitors = createWarningInhibitors(opts);
  return (warning, warn) => {
    if (!warningInhibitors.some((inhibited) => inhibited(warning))) {
      debug("Warning:", warning.code, warning.id, warning.loc);
      warn(warning, console.warn);
    }
  };
}

export function sourcemaps() {
  return {
    name: "load-source-maps",
    async load(this: PluginContext, id: string): Promise<LoadResult> {
      if (!id.endsWith(".js")) {
        return null;
      }
      try {
        const code = await readFile(id, "utf8");
        if (code.includes("sourceMappingURL")) {
          const basePath = path.dirname(id);
          const mapPath = code.match(/sourceMappingURL=(.*)/)?.[1];
          if (!mapPath) {
            this.warn({ message: "Could not find map path in file " + id, id });
            return null;
          }
          const absoluteMapPath = path.join(basePath, mapPath);
          const map = JSON.parse(await readFile(absoluteMapPath, "utf8"));
          debug("got map for file ", id);
          return { code, map };
        }
        debug("no map for file ", id);
        return { code, map: null };
      } catch (e) {
        function toString(error: any): string {
          return error instanceof Error ? error.stack ?? error.toString() : JSON.stringify(error);
        }
        this.warn({ message: toString(e), id });
        return null;
      }
    },
  };
}

// #endregion

export function makeBrowserTestConfig(pkg: PackageJson): RollupOptions {
  const module = pkg["module"] ?? "dist-esm/src/index.js";
  const basePath = path.dirname(path.parse(module).dir);

  const config: RollupOptions = {
    input: path.join(basePath, "test", "**", "*.spec.js"),
    output: {
      file: `dist-test/index.browser.js`,
      format: "umd",
      sourcemap: true,
    },
    preserveSymlinks: false,
    plugins: [
      multiEntry({ exports: false, exclude: ["**/test/**/node/**/*.js"] }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false,
        browser: true,
      }),
      cjs(),
      json(),
      sourcemaps(),
    ],
    onwarn: makeOnWarnForTesting(),
    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0,
    // rollup started respecting the "sideEffects" field in package.json.  Since
    // our package.json sets "sideEffects=false", this also applies to test
    // code, which causes all tests to be removed by tree-shaking.
    treeshake: false,
  };

  return config;
}

export interface ConfigurationOptions {
  disableBrowserBundle: boolean;
}

const defaultConfigurationOptions: ConfigurationOptions = {
  disableBrowserBundle: false,
};

export function makeConfig(
  pkg: PackageJson,
  options?: Partial<ConfigurationOptions>
): RollupOptions[] {
  options = {
    ...defaultConfigurationOptions,
    ...(options ?? {}),
  };

  const baseConfig = {
    // Use the package's module field if it has one
    input: pkg["module"] ?? "dist-esm/src/index.js",
    external: [
      ...nodeBuiltins,
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.devDependencies),
    ],
    output: { file: "dist/index.js", format: "cjs", sourcemap: true },
    preserveSymlinks: false,
    plugins: [sourcemaps(), nodeResolve(), cjs(), json()],
  };

  const config: RollupOptions[] = [baseConfig as RollupOptions];

  if (!options.disableBrowserBundle) {
    config.push(makeBrowserTestConfig(pkg));
  }

  return config;
}
