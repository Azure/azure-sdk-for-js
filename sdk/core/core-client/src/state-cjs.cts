// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Holds the singleton operationRequestMap, to be shared across CJS and ESM imports.
 */
export const state = {
  operationRequestMap: new WeakMap(),
};
