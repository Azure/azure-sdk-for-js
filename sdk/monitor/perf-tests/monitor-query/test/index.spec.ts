// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { MetricsQueryTest } from "./metricQuery.spec";
import { LogQueryBatchTest } from "./logQueryBatch.spec";
import { LogQueryTest } from "./logQuery.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([MetricsQueryTest, LogQueryBatchTest, LogQueryTest])
);
perfStressProgram.run();