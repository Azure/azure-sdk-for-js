// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NoOpTracer } from "./tracers/noop/noOpTracer";
import { Tracer } from "@opentelemetry/types";
import { getCache } from "./utils/cache";

/**
 * Sets the global tracer, enabling tracing for the Azure SDK.
 * @param tracer An OpenTelemetry Tracer instance.
 */
export function setTracer(tracer: Tracer) {
  const cache = getCache();
  cache.tracer = tracer;
  cache.userProvidedTracer = true;
}

/**
 * Retrieves the active tracer, or returns a
 * no-op implementation if one is not set.
 */
export function getTracer() {
  const cache = getCache();
  if (!cache.tracer) {
    cache.tracer = new NoOpTracer();
  }
  return cache.tracer;
}
