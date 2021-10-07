// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "@azure/test-utils-perfstress";
import { MetricsQueryClient } from "@azure/monitor-query";
import { DefaultAzureCredential } from "@azure/identity";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class MonitorQueryMetrics<TOptions> extends PerfStressTest<TOptions> {
  client: MetricsQueryClient;

  constructor() {
    super();
    const tokenCredential = new DefaultAzureCredential();
    this.client = new MetricsQueryClient(tokenCredential);
  }
}
