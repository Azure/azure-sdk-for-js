// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest, getEnvVar } from "@azure-tools/test-perf";
import { LogsIngestionClient } from "@azure/monitor-ingestion";
import { DefaultAzureCredential } from "@azure/identity";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class MonitorIngestionPerfTest<TOptions> extends PerfTest<TOptions> {
  client: LogsIngestionClient;

  constructor() {
    super();
    const tokenCredential = new DefaultAzureCredential();
    this.client = new LogsIngestionClient(getEnvVar("LOGS_INGESTION_ENDPOINT"), tokenCredential);
  }
}
