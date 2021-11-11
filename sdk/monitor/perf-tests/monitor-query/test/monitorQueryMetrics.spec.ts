// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest } from "@azure/test-utils-perf";
import { MetricsQueryClient } from "@azure/monitor-query";
import { DefaultAzureCredential } from "@azure/identity";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class MonitorQueryMetrics<TOptions> extends PerfTest<TOptions> {
  client: MetricsQueryClient;

  constructor() {
    super();
    const tokenCredential = new DefaultAzureCredential();
    this.client = new MetricsQueryClient(tokenCredential);
  }
}
