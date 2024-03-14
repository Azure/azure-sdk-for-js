// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 *
 * Holds the singleton instrumenter, to be shared across CJS and ESM imports.
 */
export const state = {
  instrumenterImplementation: undefined,
};
