// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import multiEntry from "@rollup/plugin-multi-entry";
import json from "@rollup/plugin-json";
import * as path from "path";
import { stat } from "fs/promises";

import nodeBuiltins from "builtin-modules";

function getModule(pkg) {
  const module = pkg["module"];
  if (!module) {
    throw new Error(`${pkg.name} does not specify a module field.`);
  }
  return module;
}

export async function resolveRoot(start = process.cwd()) {
  if (await stat(path.join(start, "rush.json")).catch(() => false)) {
    return start;
  } else {
    const nextPath = path.resolve(start, "..");
    if (nextPath === start) {
      throw new Error("Reached filesystem root, but no rush.json was found.");
    } else {
      return resolveRoot(nextPath);
    }
  }
}

function matchesPathSegments(str, segments) {
  return str?.includes(segments.join(path.sep));
}

function ignoreNiseSinonEval(warning) {
  return (
    warning.code === "EVAL" &&
    (matchesPathSegments(warning.id, ["node_modules", "nise"]) ||
      matchesPathSegments(warning.id, ["node_modules", "sinon"]))
  );
}

function ignoreChaiCircularDependency(warning) {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    matchesPathSegments(warning.ids?.[0], ["node_modules", "chai"])
  );
}

function ignoreRheaPromiseCircularDependency(warning) {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    matchesPathSegments(warning.ids?.[0], ["node_modules", "rhea-promise"])
  );
}

function ignoreOpenTelemetryThisIsUndefined(warning) {
  const res =
    warning.code === "THIS_IS_UNDEFINED" &&
    matchesPathSegments(warning.id, ["node_modules", "@opentelemetry", "api"]);
  return res;
}

/**
 * We ignore these warnings because some packages explicitly browser-map node builtins to `false`. Rollup will then
 * complain that node-resolve's empty module does not export symbols from them, but as long as the package doesn't
 * actually use those symbols at runtime in the browser tests, it should be fine.
 */
function ignoreMissingExportsFromEmpty(warning) {
  return (
    // I absolutely cannot explain why, but node-resolve's internal module ID for empty.js begins with a null byte.
    warning.code === "MISSING_EXPORT" && warning.exporter?.trim() === "\0node-resolve:empty.js"
  );
}

const warningInhibitors = [
  ignoreChaiCircularDependency,
  ignoreRheaPromiseCircularDependency,
  ignoreNiseSinonEval,
  ignoreOpenTelemetryThisIsUndefined,
  ignoreMissingExportsFromEmpty,
];

/**
 * Construct a warning handler for the shared rollup configuration
 * that ignores certain warnings that are not relevant to testing.
 */
export function makeOnWarnForTesting() {
  return (warning, warn) => {
    if (!warningInhibitors.some((inhibited) => inhibited(warning))) {
      warn(warning);
    }
  };
}

async function makeBrowserTestConfig(pkg) {
  const module = getModule(pkg);
  const basePath = path.dirname(path.parse(module).dir);

  const pnpmStore = path
    .relative(
      process.cwd(),
      path.join(await resolveRoot(), "common", "temp", "node_modules", ".pnpm")
    )
    .split(path.sep)
    .join("/");

  // Get a glob for a package name in the PNPM store
  const globFromStore = (name) => [pnpmStore, name.split("/").join("+"), "@*", "**/*.js"].join("/");

  const config = {
    input: path.join(basePath, "test", "**", "*.spec.js"),
    output: {
      file: `dist-test/index.browser.js`,
      format: "umd",
      sourcemap: true,
    },
    preserveSymlinks: false,
    plugins: [
      multiEntry({ exports: false, exclude: ["**/test/**/node/*.js"] }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false,
        browser: true,
      }),
      cjs({
        dynamicRequireTargets: [globFromStore("chai")],
      }),
      json(),
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

const defaultConfigurationOptions = {
  disableBrowserBundle: false,
};

export async function makeConfig(pkg, options) {
  options = {
    ...defaultConfigurationOptions,
    ...(options ?? {}),
  };

  const cjsOutput = pkg.exports?.["."]?.require ?? pkg.main;
  if (!cjsOutput) {
    throw new Error("Expecting valid main entry");
  }

  const baseConfig = {
    input: getModule(pkg),
    external: [
      ...nodeBuiltins,
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.devDependencies),
    ],
    output: { file: cjsOutput, format: "cjs", sourcemap: true, exports: "named" },
    preserveSymlinks: false,
    plugins: [nodeResolve(), cjs(), json()],
  };

  const config = [baseConfig];

  if (!options.disableBrowserBundle) {
    config.push(await makeBrowserTestConfig(pkg));
  }

  return config;
}

const openai = (await import("./package.json", { assert: { type: "json" } })).default;
export default makeConfig(openai);
