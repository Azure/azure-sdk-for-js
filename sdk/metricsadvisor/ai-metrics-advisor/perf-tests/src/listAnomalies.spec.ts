// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { getEnvVar } from "@azure-tools/test-perf";
import { MetricsAdvisorTest } from "./metricsAdvisor.spec.js";

type MetricsAdvisorTestOptions = Record<string, unknown>;

export class AnomaliesListTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  alertId: string;
  alertConfigId: string;
  public options: PerfOptionDictionary<MetricsAdvisorTestOptions> = {};
  constructor() {
    super();
    this.alertId = getEnvVar("METRICS_ADVISOR_ALERT_ID");
    this.alertConfigId = getEnvVar("METRICS_ADVISOR_ALERT_CONFIG_ID");
  }

  async run(): Promise<void> {
    const listIterator = this.client.listAnomaliesForAlert({
      alertConfigId: this.alertConfigId,
      id: this.alertId,
    });
    for await (const _anomaly of listIterator) {
      // Do nothing
    }
  }
}
