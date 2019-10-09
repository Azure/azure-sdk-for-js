// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Tracer } from "../interfaces/tracer";

const GLOBAL_TRACER_VERSION = 1;
const GLOBAL_TRACER_SYMBOL = Symbol.for("@azure/core-tracing.tracerCache");

export interface TracerCache {
  version: number;
  tracer?: Tracer;
}

let cache: TracerCache;

function loadTracerCache(): void {
  const existingCache = (self as any)[GLOBAL_TRACER_SYMBOL];
  if (existingCache) {
    if (existingCache.version !== GLOBAL_TRACER_VERSION) {
      throw new Error("Two incompatible versions of @azure/core-tracing have been loaded.");
    }
    cache = existingCache;
  } else {
    cache = {
      tracer: undefined,
      version: GLOBAL_TRACER_VERSION
    };
    (self as any)[GLOBAL_TRACER_SYMBOL] = cache;
  }
}

export function getCache(): TracerCache {
  if (!cache) {
    loadTracerCache();
  }
  return cache;
}
