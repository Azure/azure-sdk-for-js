// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { SpanExportTest } from "./spanExport.spec.js";
import { LogExportTest } from "./logExport.spec.js";
import { MetricExportTest } from "./metricExport.spec.js";
import { describe, it, assert } from "vitest";

const perfProgram = createPerfProgram(SpanExportTest, LogExportTest, MetricExportTest);
perfProgram.run();
