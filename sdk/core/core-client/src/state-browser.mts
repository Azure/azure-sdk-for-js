// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationRequest, OperationRequestInfo } from "./interfaces.js";

/**
 * Browser-only implementation of the module's state. The browser esm variant will not load the commonjs state, so we do not need to share state between the two.
 */
export const state = {
  operationRequestMap: new WeakMap<OperationRequest, OperationRequestInfo>(),
};
