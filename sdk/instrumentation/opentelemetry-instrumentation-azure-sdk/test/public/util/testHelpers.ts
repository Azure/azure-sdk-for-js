// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "vitest";
import { OpenTelemetrySpanWrapper } from "../../../src/spanWrapper.js";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { inMemoryExporter } from "./setup.js";

export function getExportedSpan(span: OpenTelemetrySpanWrapper): ReadableSpan {
  // Also tests that we end the underlying span by proxy
  span.end();
  assert.lengthOf(inMemoryExporter.getFinishedSpans(), 1);
  return inMemoryExporter.getFinishedSpans()[0];
}
