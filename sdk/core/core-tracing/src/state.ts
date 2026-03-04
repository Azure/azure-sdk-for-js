// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Instrumenter } from "./interfaces.js";

/**
 * Holds the singleton instrumenter. Under warp, ESM and CJS each hold their
 * own copy (the dual-package hazard is acceptable here because the
 * instrumenter is set once at startup). The CJS target uses state-cjs.cts
 * via polyfill substitution.
 */
export const state = {
  instrumenterImplementation: undefined as Instrumenter | undefined,
};
