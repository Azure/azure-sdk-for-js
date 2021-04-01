// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary, getEnvVar } from "@azure/test-utils-perfstress";
import { MetricsAdvisorTest } from "./metricsAdvisor.spec";
interface MetricsAdvisorTestOptions {}

export class AnomaliesListTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  alertId: string;
  alertConfigId: string;
  public options: PerfStressOptionDictionary<MetricsAdvisorTestOptions> = {};
  constructor() {
    super();
    this.alertId = getEnvVar("METRICS_ADVISOR_ALERT_ID");
    this.alertConfigId = getEnvVar("METRICS_ADVISOR_ALERT_CONFIG_ID");
  }

  async runAsync(): Promise<void> {
    let iter = this.client.listAnomalies({
      alertConfigId: this.alertConfigId,
      id: this.alertId
    });
    let result = await iter.next();
    while (!result.done) {
      result = await iter.next();
    }
  }
}
