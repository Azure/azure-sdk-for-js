// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary, getEnvVar } from "@azure/test-utils-perfstress";
import { MetricsAdvisorTest } from "./metricsAdvisor.spec";
interface MetricsAdvisorTestOptions {
  count: number;
}

export class IncidentsListTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  alertId: string;
  alertConfigId: string;
  public options: PerfStressOptionDictionary<MetricsAdvisorTestOptions> = {
    count: {
      required: true,
      description: "Number of Incidents to be listed",
      longName: "count",
      defaultValue: 30
    }
  };
  constructor() {
    super();
    this.alertId = getEnvVar("METRICS_ADVISOR_ALERT_ID");
    this.alertConfigId = getEnvVar("METRICS_ADVISOR_ALERT_CONFIG_ID");
  }

  async runAsync(): Promise<void> {
    let iter = this.client.listIncidents({
      alertConfigId: this.alertConfigId,
      id: this.alertId
    });
    let result = await iter.next();
    while (!result.done) {
      result = await iter.next();
    }
  }
}
