// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This package's runtime dependency graph expects Node's `Buffer` and
// `process` globals to be present. In the browser these are provided by npm
// polyfills and installed onto `globalThis` here.
//
// This setup file replaces the previous `@rollup/plugin-inject` approach.
// `@rollup/plugin-inject` rewrites bare `Buffer` / `process` references into
// per-module imports of the `buffer` / `process` polyfills. Under Vite 8 the
// dependency optimizer is rolldown (not esbuild), and injecting an import of
// `buffer` into the optimized `buffer` module itself creates a self-referential
// graph that deadlocks the optimizer, so the browser test run hangs forever
// after the tester pages connect. Assigning the globals from a setup file is
// bundler-agnostic and avoids that transform entirely.
import { Buffer } from "buffer";
import process from "process";

const globals = globalThis as typeof globalThis & {
  Buffer: typeof Buffer;
  process: NodeJS.Process;
};

globals.Buffer ??= Buffer;

// The browser test environment provides a partial `process` shim whose `env`
// is populated (e.g. RECORDINGS_RELATIVE_PATH for the test recorder) but which
// lacks members such as `process.nextTick` that the runtime dependency graph
// relies on. Install the full polyfill for those members while preserving the
// environment's populated `env`.
if (globals.process?.env) {
  process.env = globals.process.env;
}
globals.process = process as unknown as NodeJS.Process;
