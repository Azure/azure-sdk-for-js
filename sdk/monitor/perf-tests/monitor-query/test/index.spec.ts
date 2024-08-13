// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MetricsQueryTest } from "./metricQuery.spec";
import { LogQueryBatchTest } from "./logQueryBatch.spec";
import { LogQueryTest } from "./logQuery.spec";
import { createPerfProgram } from "@azure-tools/test-perf";

const perfProgram = createPerfProgram(MetricsQueryTest, LogQueryBatchTest, LogQueryTest);
perfProgram.run();
