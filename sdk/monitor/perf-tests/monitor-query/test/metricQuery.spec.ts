// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary, getEnvVar } from "@azure/test-utils-perfstress";
import { AggregationType } from "@azure/monitor-query";
import { MonitorQueryMetrics } from "./monitorQueryMetrics.spec";

type MonitorQueryTestOptions = Record<string, unknown>;

export class MetricsQueryTest extends MonitorQueryMetrics<MonitorQueryTestOptions> {
  metricsUri: string;
  metricNames: string[];
  aggregations: AggregationType[];
  public options: PerfStressOptionDictionary<MonitorQueryTestOptions> = {};
  constructor() {
    super();
    this.metricsUri = getEnvVar("METRICS_RESOURCE_ID");
    this.metricNames = ["MatchedEventCount"];
    this.aggregations = ["Count"];
  }

  async runAsync(): Promise<void> {
    await this.client.queryResource(this.metricsUri, this.metricNames, {
      aggregations: this.aggregations
    });
  }
}
