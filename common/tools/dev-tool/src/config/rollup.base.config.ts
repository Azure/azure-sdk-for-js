// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PluginContext, RollupWarning, WarningHandler } from "rollup";

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import multiEntry from "@rollup/plugin-multi-entry";
import json from "@rollup/plugin-json";
import * as path from "path";

import nodeBuiltins from "builtin-modules";
import { createPrinter } from "../util/printer";

const { debug } = createPrinter("rollup.base.config");

interface PackageJson {
  name: string;
  module: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

/**
 * The default sourcemaps plugin does not provide very much information in warnings, so this shim allows us to capture
 * the active sourcemaps loading context.
 *
 * This allows us to selectively disable warnings about missing source maps, for example in core-asynciterator-polyfill.
 */
export function sourcemapsExtra() {
  const _sourcemaps = sourcemaps();

  const load = _sourcemaps.load;

  if (!load) return _sourcemaps;

  return Object.assign(_sourcemaps, {
    load(this: PluginContext, id: string) {
      const shim = new Proxy(this, {
        get(context, p, ...rest) {
          if (p === "warn") {
            const warn = context.warn;
            return (warning: unknown) => {
              const warningObject = (
                typeof warning === "string" ? { message: warning } : warning
              ) as RollupWarning;

              warningObject.id = id;

              warn(warningObject);
            };
          }
          return Reflect.get(context, p, ...rest);
        },
      });

      return load.call(shim, id);
    },
  });
}

// #region Warning Handler

/**
 * A function that can determine whether a rollup warning should be ignored. If
 * the function returns `true`, then the warning will not be displayed.
 */
export type WarningInhibitor = (warning: RollupWarning) => boolean;

function ignoreNiseSinonEval(warning: RollupWarning): boolean {
  return (
    warning.code === "EVAL" &&
    (warning.id?.includes(["node_modules", "nise"].join(path.sep)) ||
      warning.id?.includes(["node_modules", "sinon"].join(path.sep))) === true
  );
}

function ignoreChaiCircularDependency(warning: RollupWarning): boolean {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    warning.importer?.includes(["node_modules", "chai"].join(path.sep)) === true
  );
}

function ignoreOpenTelemetryThisIsUndefined(warning: RollupWarning): boolean {
  return (
    warning.code === "THIS_IS_UNDEFINED" &&
    warning.id?.includes(["node_modules", "@opentelemetry", "api"].join(path.sep)) === true
  );
}

/**
 * v1.0.0 of @azure/core-asynciterator-polyfill does not provide a source map.
 *
 * This was a bug, and this function works around that bug.
 */
function ignoreAsyncIteratorPolyfillSourceMaps(warning: RollupWarning): boolean {
  return (
    warning.code === "PLUGIN_WARNING" &&
    warning.plugin === "sourcemaps" &&
    warning.id?.includes("@azure+core-asynciterator-polyfill@1.0.0") === true
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

const warningInhibitors: Array<(warning: RollupWarning) => boolean> = [
  ignoreChaiCircularDependency,
  ignoreNiseSinonEval,
  ignoreOpenTelemetryThisIsUndefined,
  ignoreAsyncIteratorPolyfillSourceMaps,
  ignoreMissingExportsFromEmpty,
];

/**
 * Construct a warning handler for the shared rollup configuration
 * that ignores certain warnings that are not relevant to testing.
 */
export function makeOnWarnForTesting(): (warning: RollupWarning, warn: WarningHandler) => void {
  return (warning, warn) => {
    if (!warningInhibitors.some((inhibited) => inhibited(warning))) {
      debug("Warning:", warning.code, warning.id, warning.loc);
      warn(warning);
    }
  };
}

// #endregion

export function makeBrowserTestConfig(pkg: PackageJson): RollupOptions {
  // ./dist-esm/src/index.js -> ./dist-esm
  // ./dist-esm/keyvault-keys/src/index.js -> ./dist-esm/keyvault-keys
  const module = pkg["module"] ?? "dist-esm/src/index.js";
  const basePath = path.dirname(path.parse(module).dir);

  const config: RollupOptions = {
    input: {
      include: [path.join(basePath, "test", "**", "*.spec.js")],
      exclude: [path.join(basePath, "test", "**", "node", "**")],
    },
    output: {
      file: `dist-test/index.browser.js`,
      format: "umd",
      sourcemap: true,
    },
    preserveSymlinks: false,
    plugins: [
      multiEntry({ exports: false }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false,
      }),
      cjs(),
      json(),
      sourcemapsExtra(),
      //viz({ filename: "dist-test/browser-stats.html", sourcemap: true })
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
