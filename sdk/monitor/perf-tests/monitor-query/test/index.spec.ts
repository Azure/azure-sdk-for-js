// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MetricsQueryTest } from "./metricQuery.spec.js";
import { LogQueryBatchTest } from "./logQueryBatch.spec.js";
import { LogQueryTest } from "./logQuery.spec.js";
import { createPerfProgram } from "@azure-tools/test-perf";
import { describe, it, assert } from "vitest";

const perfProgram = createPerfProgram(MetricsQueryTest, LogQueryBatchTest, LogQueryTest);
perfProgram.run();
