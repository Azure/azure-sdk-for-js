// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This package's runtime dependency graph expects Node's `Buffer` global to be
// present. In the browser it is provided by an npm polyfill and installed onto
// `globalThis` here.
//
// This setup file replaces the previous `@rollup/plugin-inject` approach.
// `@rollup/plugin-inject` rewrites bare `Buffer` references into per-module
// imports of the `buffer` polyfill. Under Vite 8 the dependency optimizer is
// rolldown (not esbuild), and injecting an import of `buffer` into the optimized
// `buffer` module itself creates a self-referential graph that deadlocks the
// optimizer, so the browser test run hangs forever after the tester pages
// connect. Assigning the global from a setup file is bundler-agnostic and avoids
// that transform entirely.
import { Buffer } from "buffer";

const globals = globalThis as typeof globalThis & { Buffer: typeof Buffer };

globals.Buffer = Buffer;
