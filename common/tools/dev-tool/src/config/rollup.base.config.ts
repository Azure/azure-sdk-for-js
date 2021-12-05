import { RollupWarning, WarningHandler } from "rollup";

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import multiEntry from "@rollup/plugin-multi-entry";
import json from "@rollup/plugin-json";

import nodeBuiltins from "builtin-modules";

interface PackageJson {
  name: string;
  module: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

/**
 * Gets the proper configuration needed for rollup's commonJS plugin for @opentelemetry/api.
 *
 * NOTE: this manual configuration is only needed because OpenTelemetry uses an
 * __exportStar downleveled helper function to declare its exports which confuses
 * rollup's automatic discovery mechanism.
 *
 * @returns an object reference that can be `...`'d into your cjs() configuration.
 */
export function openTelemetryCommonJs(): Record<string, string[]> {
  const namedExports: Record<string, string[]> = {};

  for (const key of ["@opentelemetry/api", "@azure/core-tracing/node_modules/@opentelemetry/api"]) {
    namedExports[key] = [
      "SpanKind",
      "TraceFlags",
      "getSpan",
      "setSpan",
      "SpanStatusCode",
      "getSpanContext",
      "setSpanContext"
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
        "setSpanContext"
      ];
  }

  return namedExports;
}

// #region Warning Handler

/**
 * A function that can determine whether a rollupwarning should be ignored. If
 * the function returns `true`, then the warning will not be displayed.
 */
export type WarningInhibitor = (warning: RollupWarning) => boolean;

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

export function makeBrowserTestConfig(): RollupOptions {
  const config: RollupOptions = {
    input: {
      include: ["dist-esm/test/**/*.spec.js"],
      exclude: ["dist-esm/test/**/node/**"]
    },
    output: {
      file: `dist-test/index.browser.js`,
      format: "umd",
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [
      multiEntry({ exports: false }),
      nodeResolve({
        mainFields: ["module", "browser"]
      }),
      cjs({
        namedExports: {
          // Chai's strange internal architecture makes it impossible to statically
          // analyze its exports.
          chai: ["version", "use", "util", "config", "expect", "should", "assert"],
          ...openTelemetryCommonJs()
        }
      }),
      json(),
      sourcemaps()
      //viz({ filename: "dist-test/browser-stats.html", sourcemap: true })
    ],
    onwarn: makeOnWarnForTesting(),
    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0,
    // rollup started respecting the "sideEffects" field in package.json.  Since
    // our package.json sets "sideEffects=false", this also applies to test
    // code, which causes all tests to be removed by tree-shaking.
    treeshake: false
  };

  return config;
}

export interface ConfigurationOptions {
  disableBrowserBundle: boolean;
}

const defaultConfigurationOptions: ConfigurationOptions = {
  disableBrowserBundle: false
};

export function makeConfig(pkg: PackageJson, options?: Partial<ConfigurationOptions>): RollupOptions[] {
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
