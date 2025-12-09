// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";

// Use BasicTracerProvider in the browser.
export function createTracerProvider(spanProcessors: SpanProcessor[]): WebTracerProvider {
  return new WebTracerProvider({
    spanProcessors: spanProcessors,
  });
}
