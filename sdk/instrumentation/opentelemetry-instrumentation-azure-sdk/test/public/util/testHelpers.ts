// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenTelemetrySpanWrapper } from "../../../src/spanWrapper.js";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { inMemoryExporter } from "./setup.js";
import { assert } from "vitest";

export function getExportedSpan(span: OpenTelemetrySpanWrapper): ReadableSpan {
  // Also tests that we end the underlying span by proxy
  span.end();
  assert.lengthOf(inMemoryExporter.getFinishedSpans(), 1);
  return inMemoryExporter.getFinishedSpans()[0];
}
