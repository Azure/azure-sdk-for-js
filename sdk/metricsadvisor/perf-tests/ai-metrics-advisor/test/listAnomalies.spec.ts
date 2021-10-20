// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfOptionDictionary, getEnvVar } from "@azure/test-utils-perf";
import { MetricsAdvisorTest } from "./metricsAdvisor.spec";
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
    const listIterator = this.client.listAnomalies({
      alertConfigId: this.alertConfigId,
      id: this.alertId
    });
    // eslint-disable-next-line no-empty
    for await (const _anomaly of listIterator) {
    }
  }
}
