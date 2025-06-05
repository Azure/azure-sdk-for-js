// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NodeTracerProvider, SpanProcessor } from "@opentelemetry/sdk-trace-node";

// Use NodeTracerProvider in Node.js environments.
export function createTracerProvider(spanProcessors: SpanProcessor[]): NodeTracerProvider {
  return new NodeTracerProvider({
    spanProcessors: spanProcessors,
  });
}
