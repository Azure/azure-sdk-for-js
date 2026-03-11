// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Instrumenter } from "./interfaces.js";

/**
 * @internal
 *
 * Holds the singleton instrumenter, to be shared across CJS and ESM imports.
 */
export const state = {
  instrumenterImplementation: undefined as Instrumenter | undefined,
};
