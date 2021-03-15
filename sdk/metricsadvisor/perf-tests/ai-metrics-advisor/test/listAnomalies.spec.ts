// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  PerfStressOptionDictionary,
  executeParallel,
  getEnvVar
} from "@azure/test-utils-perfstress";
import { MetricsAdvisorTest } from "./MetricsAdvisor.spec";
interface MetricsAdvisorTestOptions {
  count: number;
}

export class AnomaliesListTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  alertId: string;
  alertConfigId: string;
  public options: PerfStressOptionDictionary<MetricsAdvisorTestOptions> = {
    count: {
      required: true,
      description: "Number of anomalies to be listed",
      longName: "count",
      defaultValue: 10
    }
  };
  constructor() {
    super();
    this.alertId = getEnvVar("METRICS_ADVISOR_ALERT_ID");
    this.alertConfigId = getEnvVar("METRICS_ADVISOR_ALERT_CONFIG_ID");
  }

  public async globalSetup() {
    await super.globalSetup();
    await executeParallel(
      async (count: number, parallelIndex: number) => {
        console.log(`[` + parallelIndex + `] ` + count);
      },
      this.options.count.value!,
      32
    );
  }

  async runAsync(): Promise<void> {
    const anomalies = this.client.listAnomalies({
      alertConfigId: this.alertConfigId,
      id: this.alertId
    });
    let i = 1;
    for await (const anomaly of anomalies) {
      console.log(`anomaly ${i++}:`);
      console.log(anomaly);
    }
  }
}
