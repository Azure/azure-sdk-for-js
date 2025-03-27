// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { getEnvVar } from "@azure-tools/test-perf";
import type { AggregationType } from "@azure/monitor-query";
import { MonitorQueryMetrics } from "./monitorQueryMetrics.spec.js";

type MonitorQueryTestOptions = Record<string, unknown>;

export class MetricsQueryTest extends MonitorQueryMetrics<MonitorQueryTestOptions> {
  metricsUri: string;
  metricNames: string[];
  aggregations: AggregationType[];
  public options: PerfOptionDictionary<MonitorQueryTestOptions> = {};
  constructor() {
    super();
    this.metricsUri = getEnvVar("METRICS_RESOURCE_ID");
    this.metricNames = ["SuccessfulCalls"];
    this.aggregations = ["Count"];
  }

  async run(): Promise<void> {
    await this.client.queryResource(this.metricsUri, this.metricNames, {
      aggregations: this.aggregations,
    });
  }
}
