// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type OpenAI from "openai";
import { isGenAITracingApplied, isTraceContextPropagationEnabled } from "./configuration.js";
import { createRequestHeaders } from "./tracingClient.js";

type FetchFn = NonNullable<NonNullable<ConstructorParameters<typeof OpenAI>[0]>["fetch"]>;

/**
 * Wraps a fetch function to inject OpenTelemetry trace context headers
 * (traceparent, tracestate) into outgoing requests when GenAI tracing is enabled.
 *
 * @param innerFetch - The underlying fetch function to wrap. If undefined, uses globalThis.fetch.
 * @returns A fetch-compatible function that injects tracing headers.
 */
export function getTracingFetch(innerFetch?: FetchFn): FetchFn {
  const baseFetch = innerFetch ?? (globalThis.fetch as FetchFn);
  return async function (resource, options): Promise<Response> {
    if (!isGenAITracingApplied() || !isTraceContextPropagationEnabled()) {
      return baseFetch(resource, options);
    }
    const tracingHeaders = createRequestHeaders();
    if (Object.keys(tracingHeaders).length === 0) {
      return baseFetch(resource, options);
    }

    // Merge tracing headers into the request
    const fetchRequest = new Request(resource, options);
    for (const [key, value] of Object.entries(tracingHeaders)) {
      fetchRequest.headers.set(key, value);
    }
    return baseFetch(fetchRequest);
  };
}
