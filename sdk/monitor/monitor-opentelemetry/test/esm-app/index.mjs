// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { isWrapped } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";

new HttpInstrumentation();
const { request } = await import("node:http");
assert.ok(isWrapped(request), "OpenTelemetry should instrument the ESM import of http.request");
