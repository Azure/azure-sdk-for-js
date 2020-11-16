import { RollupWarning, WarningHandler } from "rollup";

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import multiEntry from "@rollup/plugin-multi-entry";
import json from "@rollup/plugin-json";
import nodeBuiltinsPlugin from "rollup-plugin-node-builtins";
import nodeGlobals from "rollup-plugin-node-globals";

import nodeBuiltins from "builtin-modules";

interface PackageJson {
  name: string;
  module: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

// #region Warning Handler

function ignoreNiseSinonEvalWarnings(warning: RollupWarning): boolean {
  return (
    warning.code === "EVAL" &&
    (warning.id?.includes("node_modules/nise") || warning.id?.includes("node_modules/sinon")) ===
      true
  );
}

function ignoreChaiCircularDependencyWarnings(warning: RollupWarning): boolean {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    warning.importer?.includes("node_modules/chai") === true
  );
}

const warningInhibitors: Array<(warning: RollupWarning) => boolean> = [
  ignoreChaiCircularDependencyWarnings,
  ignoreNiseSinonEvalWarnings
];

/**
 * Construct a warning handler for the shared rollup configuration
 * that ignores certain warnings that are not relevant to testing.
 */
function makeOnWarnForTesting(): (warning: RollupWarning, warn: WarningHandler) => void {
  return (warning, warn) => {
    // If every inhibitor returns false (i.e. no inhibitors), then show the warning
    if (warningInhibitors.every((inhib) => !inhib(warning))) {
      warn(warning);
    }
  };
}

// #endregion

function makeBrowserTestConfig() {
  const config: RollupOptions = {
    input: {
      include: ["dist-esm/test/**/*.spec.js"],
      exclude: ["dist-esm/test/**/node/*.spec.js"]
    },
    output: {
      file: `dist-test/index.browser.js`,
      format: "umd",
      sourcemap: true,
      globals: { "fs-extra": "undefined" }
    },
    preserveSymlinks: false,
    // fs-extra must be marked as external in order to avoid an initialization error
    external: ["fs-extra"],
    plugins: [
      multiEntry({ exports: false }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: true
      }),
      cjs({
        namedExports: {
          chai: ["assert", "use"],
          "@opentelemetry/api": ["CanonicalCode", "SpanKind", "TraceFlags"]
        }
      }),
      json(),
      sourcemaps(),
      nodeGlobals(),
      nodeBuiltinsPlugin()
      //viz({ filename: "dist-test/browser-stats.html", sourcemap: true })
    ],
    onwarn: makeOnWarnForTesting(),
    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0,
    // rollup started respecting the "sideEffects" field in package.json.  Since
    // our package.json sets "sideEffects=false", this also applies to test
    // code, which causes all tests to be removed by tree-shaking.
    treeshake: false
  };

  // (config.external as string[]).push(...Object.keys(pkg.devDependencies));

  return config;
}

export interface ConfigurationOptions {
  disableBrowserBundle: boolean;
}

const defaultConfigurationOptions: ConfigurationOptions = {
  disableBrowserBundle: false
};

export function makeConfig(pkg: PackageJson, options?: Partial<ConfigurationOptions>) {
  options = {
    ...defaultConfigurationOptions,
    ...(options ?? {})
  };

  const baseConfig = {
    // Use the package's module field if it has one
    input: pkg["module"] ?? "dist-esm/src/index.js",
    external: [
      ...nodeBuiltins,
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.devDependencies)
    ],
    output: { file: "dist/index.js", format: "cjs", sourcemap: true },
    preserveSymlinks: false,
    plugins: [sourcemaps(), nodeResolve(), cjs()]
  };

  const config: RollupOptions[] = [baseConfig as RollupOptions];

  if (!options.disableBrowserBundle) {
    config.push(makeBrowserTestConfig());
  }

  return config;
}
