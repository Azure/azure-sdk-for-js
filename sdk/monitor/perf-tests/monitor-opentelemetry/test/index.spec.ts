// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure/test-utils-perf";
import { SpanExportTest } from "./spanExport.spec";
import { LogExportTest } from "./logExport.spec";
import { MetricExportTest } from "./metricExport.spec";

const perfProgram = createPerfProgram(SpanExportTest, LogExportTest, MetricExportTest);
perfProgram.run();
