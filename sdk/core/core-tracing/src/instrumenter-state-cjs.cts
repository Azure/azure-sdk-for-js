// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 *
 * The tracing instrumenter that can be replaced at runtime by OpenTelemetry instrumentation.
 *
 * Unknown is used to avoid importing `interfaces` from the CJS module, which would require dynamic imports.
 */
let instrumenterImplementation: unknown | undefined;

/**
 * @internal
 *
 * Holds the singleton instrumenter, to be shared across CJS and ESM imports.
 */
export const state = {
  instrumenterImplementation,
};
