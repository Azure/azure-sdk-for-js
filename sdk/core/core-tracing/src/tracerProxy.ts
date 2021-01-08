// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NoOpTracer } from "./tracers/noop/noOpTracer";
import { Tracer } from "@opentelemetry/api";
import { getCache } from "./utils/cache";

let defaultTracer: Tracer;

function getDefaultTracer(): Tracer {
  if (!defaultTracer) {
    defaultTracer = new NoOpTracer();
  }
  return defaultTracer;
}

/**
 * Sets the global tracer, enabling tracing for the Azure SDK.
 * @param tracer - An OpenTelemetry Tracer instance.
 */
export function setTracer(tracer: Tracer): void {
  const cache = getCache();
  cache.tracer = tracer;
}

/**
 * Retrieves the active tracer, or returns a
 * no-op implementation if one is not set.
 */
export function getTracer(): Tracer {
  const cache = getCache();
  if (!cache.tracer) {
    return getDefaultTracer();
  }
  return cache.tracer;
}
