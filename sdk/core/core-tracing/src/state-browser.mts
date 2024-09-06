// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Instrumenter } from "./interfaces.js";

/**
 * Browser-only implementation of the module's state. The browser esm variant will not load the commonjs state, so we do not need to share state between the two.
 */
export const state = {
  instrumenterImplementation: undefined as Instrumenter | undefined,
};
