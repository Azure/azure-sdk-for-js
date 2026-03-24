// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationRequest, OperationRequestInfo } from "./interfaces.js";

/**
 * @internal
 *
 * Holds the singleton operationRequestMap, to be shared across CJS and ESM imports.
 * Uses a global symbol key so that both module systems reference the same object.
 */
const stateKey = Symbol.for("@azure/core-client.state");
const globalRef = globalThis as Record<symbol, unknown>;
if (!globalRef[stateKey]) {
  globalRef[stateKey] = {
    operationRequestMap: new WeakMap<OperationRequest, OperationRequestInfo>(),
  };
}
export const state = globalRef[stateKey] as {
  operationRequestMap: WeakMap<OperationRequest, OperationRequestInfo>;
};
