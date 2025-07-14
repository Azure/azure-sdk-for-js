// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest } from "@azure-tools/test-perf";
import { MetricsQueryClient } from "@azure/monitor-query";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

export abstract class MonitorQueryMetrics<TOptions> extends PerfTest<TOptions> {
  client: MetricsQueryClient;

  constructor() {
    super();
    const tokenCredential = new DefaultAzureCredential();
    this.client = new MetricsQueryClient(tokenCredential);
  }
}
