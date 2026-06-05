// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationRequest, OperationRequestInfo } from "./interfaces.js";

/**
 * Holds the singleton operationRequestMap, to be shared across CJS and ESM imports.
 */
export const state = {
  operationRequestMap: new WeakMap<OperationRequest, OperationRequestInfo>(),
};
