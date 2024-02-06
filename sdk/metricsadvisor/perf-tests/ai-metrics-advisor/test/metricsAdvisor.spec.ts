// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest, getEnvVar } from "@azure/test-utils-perf";
import { MetricsAdvisorClient, MetricsAdvisorKeyCredential } from "@azure/ai-metrics-advisor";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class MetricsAdvisorTest<TOptions> extends PerfTest<TOptions> {
  client: MetricsAdvisorClient;

  constructor() {
    super();
    this.client = new MetricsAdvisorClient(
      getEnvVar("METRICS_ADVISOR_ENDPOINT"),
      new MetricsAdvisorKeyCredential(
        getEnvVar("METRICS_ADVISOR_SUBSCRIPTION_KEY"),
        getEnvVar("METRICS_ADVISOR_API_KEY")
      )
    );
  }
}
