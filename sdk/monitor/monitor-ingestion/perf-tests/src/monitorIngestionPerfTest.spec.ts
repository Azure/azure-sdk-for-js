// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest, getEnvVar } from "@azure-tools/test-perf";
import { LogsIngestionClient } from "@azure/monitor-ingestion";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

export abstract class MonitorIngestionPerfTest<TOptions> extends PerfTest<TOptions> {
  client: LogsIngestionClient;

  constructor() {
    super();
    const tokenCredential = new DefaultAzureCredential();
    this.client = new LogsIngestionClient(getEnvVar("LOGS_INGESTION_ENDPOINT"), tokenCredential);
  }
}
