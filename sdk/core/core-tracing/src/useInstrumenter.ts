// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NoOpInstrumenter } from "./instrumenter";
import { Instrumenter } from "./interfaces";

/** @internal */
let instrumenterImplementation: Instrumenter = new NoOpInstrumenter();

/**
 * Extends the Azure SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  instrumenterImplementation = instrumenter;
}

export function getInstrumenter(): Instrumenter {
  return instrumenterImplementation;
}
