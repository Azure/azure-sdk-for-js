// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Tracer } from "@opentelemetry/types";
import { getGlobalObject } from "./global";

const GLOBAL_TRACER_VERSION = 2;
// preview5 shipped with @azure/core-tracing.tracerCache
// and didn't have smart detection for collisions
const GLOBAL_TRACER_SYMBOL = Symbol.for("@azure/core-tracing.tracerCache2");

export interface TracerCache {
  version: number;
  tracer?: Tracer;
}

let cache: TracerCache;

function loadTracerCache(): void {
  const globalObj = getGlobalObject();
  const existingCache: TracerCache = globalObj[GLOBAL_TRACER_SYMBOL];
  let setGlobalCache = true;
  if (existingCache) {
    if (existingCache.version === GLOBAL_TRACER_VERSION) {
      cache = existingCache;
    } else {
      setGlobalCache = false;
      if (existingCache.tracer) {
        throw new Error(
          `Two incompatible versions of @azure/core-tracing have been loaded.
          This library is ${GLOBAL_TRACER_VERSION}, existing is ${existingCache.version}.`
        );
      }
    }
  }

  if (!cache) {
    cache = {
      tracer: undefined,
      version: GLOBAL_TRACER_VERSION
    };
  }
  if (setGlobalCache) {
    globalObj[GLOBAL_TRACER_SYMBOL] = cache;
  }
}

export function getCache(): TracerCache {
  if (!cache) {
    loadTracerCache();
  }
  return cache;
}
