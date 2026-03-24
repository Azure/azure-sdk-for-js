// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Instrumenter } from "./interfaces.js";

/**
 * @internal
 *
 * Holds the singleton instrumenter, to be shared across CJS and ESM imports.
 * Uses a global symbol key so that both module systems reference the same object.
 */
const stateKey = Symbol.for("@azure/core-tracing.state");
const globalRef = globalThis as Record<symbol, unknown>;
if (!globalRef[stateKey]) {
  globalRef[stateKey] = {
    instrumenterImplementation: undefined,
  };
}
export const state = globalRef[stateKey] as {
  instrumenterImplementation: Instrumenter | undefined;
};
