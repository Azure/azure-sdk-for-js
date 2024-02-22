// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as cjsState from "./state-cjs.cjs";

import { Instrumenter } from "./interfaces.js";

export const state = {
  instrumenterImplementation: cjsState.state.instrumenterImplementation as Instrumenter | undefined,
};
