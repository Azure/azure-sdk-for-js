// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LoadResult,
  PluginContext,
  RollupOptions,
  RollupLog,
  WarningHandlerWithDefault,
} from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import multiEntry from "@rollup/plugin-multi-entry";
import json from "@rollup/plugin-json";
import * as path from "node:path";
import { readFile } from "node:fs/promises";
import nodeBuiltins from "builtin-modules";
import { createPrinter } from "../util/printer";

const { debug } = createPrinter("rollup.base.config");

interface PackageJson {
  name: string;
  module?: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

// #region Warning Handler

/**
 * A function that can determine whether a rollup warning should be ignored. If
 * the function returns `true`, then the warning will not be displayed.
 */
export type WarningInhibitor = (warning: RollupLog) => boolean;

function matchesPathSegments(str: string | undefined, segments: string[]): boolean {
  return !str ? false : str.includes(segments.join("/")) || str.includes(segments.join("\\"));
}

function ignoreNiseSinonEval(warning: RollupLog): boolean {
  return (
    warning.code === "EVAL" &&
    (matchesPathSegments(warning.id, ["node_modules", "nise"]) ||
      matchesPathSegments(warning.id, ["node_modules", "sinon"]))
  );
}

function ignoreChaiCircularDependency(warning: RollupLog): boolean {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    matchesPathSegments(warning.ids?.[0], ["node_modules", "chai"])
  );
}

function ignoreRheaPromiseCircularDependency(warning: RollupLog): boolean {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    matchesPathSegments(warning.ids?.[0], ["node_modules", "rhea-promise"])
  );
}

function ignoreOpenTelemetryCircularDependency(warning: RollupLog): boolean {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    matchesPathSegments(warning.ids?.[0], ["node_modules", "@opentelemetry"])
  );
}

function ignoreOpenTelemetryThisIsUndefined(warning: RollupLog): boolean {
  return (
    warning.code === "THIS_IS_UNDEFINED" &&
    matchesPathSegments(warning.id, ["node_modules", "@opentelemetry"])
  );
}

/**
 * We ignore these warnings because some packages explicitly browser-map node builtins to `false`. Rollup will then
 * complain that node-resolve's empty module does not export symbols from them, but as long as the package doesn't
 * actually use those symbols at runtime in the browser tests, it should be fine.
 */
function ignoreMissingExportsFromEmpty(warning: RollupLog): boolean {
  return (
    // I absolutely cannot explain why, but node-resolve's internal module ID for empty.js begins with a null byte.
    warning.code === "MISSING_EXPORT" && warning.exporter?.trim() === "\0node-resolve:empty.js"
  );
}

function ignoreExternalModules(warning: RollupLog): boolean {
  return (
    (warning.code === "MISSING_GLOBAL_NAME" && nodeBuiltins.includes(warning.id!)) ||
    (warning.code === "UNRESOLVED_IMPORT" && nodeBuiltins.includes(warning.exporter!)) ||
    warning.code === "MISSING_NODE_BUILTINS"
  );
}

function createWarningInhibitors({
  ignoreMissingNodeBuiltins,
}: MakeOnWarnForTestingOptions = {}): Array<(warning: RollupLog) => boolean> {
  return [
    ignoreChaiCircularDependency,
    ignoreRheaPromiseCircularDependency,
    ignoreNiseSinonEval,
    ignoreOpenTelemetryCircularDependency,
    ignoreOpenTelemetryThisIsUndefined,
    ignoreMissingExportsFromEmpty,
    ...(ignoreMissingNodeBuiltins ? [ignoreExternalModules] : []),
  ];
}

interface MakeOnWarnForTestingOptions {
  ignoreMissingNodeBuiltins?: boolean;
}

/**
 * Construct a warning handler for the shared rollup configuration
 * that ignores certain warnings that are not relevant to testing.
 */
export function makeOnWarnForTesting(
  opts: MakeOnWarnForTestingOptions = {},
): (warning: RollupLog, warn: WarningHandlerWithDefault) => void {
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
      if (id.startsWith("\x00")) {
        // Some Rollup plugins mark virtual modules with \0 prefix. Other plugins should not try to process it.
        //     https://rollupjs.org/plugin-development/#conventions
        return null;
      }
      try {
        const code = await readFile(id, "utf8");
        if (code.includes("sourceMappingURL")) {
          const basePath = path.dirname(id);
          const mapping = code.match(/sourceMappingURL=(.*)/)?.[1];
          if (!mapping) {
            this.warn({ message: "Could not find source mapping in file " + id, id });
            return null;
          }
          if (mapping.startsWith("data:")) {
            debug("inline source map in", id);
            if (mapping.startsWith("data:application/json;charset=utf-8;base64,")) {
              const base64Encoded = mapping.split(",")?.[1];
              const decoded = Buffer.from(base64Encoded, "base64").toString("utf-8");
              const map = JSON.parse(decoded);
              return { code, map };
            }
            this.warn({ message: "Unsupported inline source map for" + id, id });
            return null;
          }
          const absoluteMapPath = path.join(basePath, mapping);
          const map = JSON.parse(await readFile(absoluteMapPath, "utf8"));
          debug("got map for file ", id);
          return { code, map };
        }
        debug("no map for file ", id);
        return { code, map: null };
      } catch (e) {
        // eslint-disable-next-line no-inner-declarations
        function toString(error: unknown): string {
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
  options?: Partial<ConfigurationOptions>,
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
