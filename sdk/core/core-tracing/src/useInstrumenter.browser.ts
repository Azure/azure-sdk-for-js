// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NoOpInstrumenter } from "./instrumenter";
import { Instrumenter } from "./interfaces";

const GLOBAL_INSTRUMENTER_SYMBOL = Symbol("@azure/core-tracing instrumenter");

interface Cache {
  instrumenter: Instrumenter;
}

let cache: Cache;
function getCache(): Cache {
  if (!cache) {
    const globalObj: any = globalThis;
    if (!globalObj[GLOBAL_INSTRUMENTER_SYMBOL]) {
      globalObj[GLOBAL_INSTRUMENTER_SYMBOL] = {
        instrumenter: new NoOpInstrumenter()
      };
    }
    cache = globalObj[GLOBAL_INSTRUMENTER_SYMBOL];
  }
  return cache;
}

/**
 * Retrieves the currently set instrumenter, or returns a
 * no-op implementation if one is not set.
 */
export function getInstrumenter(): Instrumenter {
  return getCache().instrumenter;
}

/**
 * Sets the instrumenter to use for all future requests.
 * @param instrumenter - The instrumenter to use.
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  getCache().instrumenter = instrumenter;
}
