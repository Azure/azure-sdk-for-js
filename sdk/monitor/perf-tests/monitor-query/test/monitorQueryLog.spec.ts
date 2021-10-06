// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import {  LogsQueryClient } from "@azure/monitor-query";
import {DefaultAzureCredential} from "@azure/identity";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class MetricsAdvisorTest<TOptions> extends PerfStressTest<TOptions> {
  client:LogsQueryClient;

  constructor() {
    super();
    const tokenCredential = new DefaultAzureCredential();
    this.client = new LogsQueryClient(tokenCredential);
  }
}