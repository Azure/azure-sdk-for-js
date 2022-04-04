// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { MetricsQueryTest } from "./metricQuery.spec";
import { LogQueryBatchTest } from "./logQueryBatch.spec";
import { LogQueryTest } from "./logQuery.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([MetricsQueryTest, LogQueryBatchTest, LogQueryTest])
);
perfProgram.run();
