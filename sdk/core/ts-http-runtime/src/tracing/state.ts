// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Instrumenter } from "./interfaces.js";
// @ts-expect-error The recommended approach to sharing module state between ESM and CJS.
// See https://github.com/isaacs/tshy/blob/main/README.md#module-local-state for additional information.
import { state as cjsState } from "../commonjs/tracing/state.js";

/**
 * Defines the shared state between CJS and ESM by re-exporting the CJS state.
 */
export const state = cjsState as {
  instrumenterImplementation: Instrumenter | undefined;
};
