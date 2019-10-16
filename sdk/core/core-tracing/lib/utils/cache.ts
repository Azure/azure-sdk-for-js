// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Tracer } from "@opentelemetry/types";
import { getGlobalObject } from "./global";

const GLOBAL_TRACER_VERSION = 1;
const GLOBAL_TRACER_SYMBOL = Symbol.for("@azure/core-tracing.tracerCache");

export interface TracerCache {
  version: number;
  tracer?: Tracer;
}

let cache: TracerCache;

function loadTracerCache(): void {
  const globalObj = getGlobalObject();
  const existingCache: TracerCache = globalObj[GLOBAL_TRACER_SYMBOL];
  if (existingCache) {
    if (existingCache.version !== GLOBAL_TRACER_VERSION) {
      throw new Error(
        `Two incompatible versions of @azure/core-tracing have been loaded.
         This library is ${GLOBAL_TRACER_VERSION}, existing is ${existingCache.version}.`
      );
    }
    cache = existingCache;
  } else {
    cache = {
      tracer: undefined,
      version: GLOBAL_TRACER_VERSION
    };
    globalObj[GLOBAL_TRACER_SYMBOL] = cache;
  }
}

export function getCache(): TracerCache {
  if (!cache) {
    loadTracerCache();
  }
  return cache;
}
