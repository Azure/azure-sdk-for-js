// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationRequest, OperationRequestInfo } from "./interfaces.js";

/**
 * Holds the singleton operation request map. Under warp, ESM and CJS each
 * hold their own copy (the dual-package hazard is acceptable here because
 * the map is a WeakMap keyed on request objects which are format-local).
 * The CJS target uses state-cjs.cts via polyfill substitution.
 */
export const state = {
  operationRequestMap: new WeakMap<OperationRequest, OperationRequestInfo>(),
};
