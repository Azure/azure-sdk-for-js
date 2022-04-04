// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenTelemetrySpanWrapper } from "../../../src/spanWrapper";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { assert } from "chai";
import { inMemoryExporter } from "./setup";

export function getExportedSpan(span: OpenTelemetrySpanWrapper): ReadableSpan {
  // Also tests that we end the underlying span by proxy
  span.end();
  assert.lengthOf(inMemoryExporter.getFinishedSpans(), 1);
  return inMemoryExporter.getFinishedSpans()[0];
}
