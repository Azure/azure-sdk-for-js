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

export class RootCauseTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  detectionConfigId: string;
  incidentId: string;
  public options: PerfStressOptionDictionary<MetricsAdvisorTestOptions> = {
    count: {
      required: true,
      description: "Number of Root Causes to be listed",
      longName: "count",
      defaultValue: 10
    }
  };
  constructor() {
    super();
    this.detectionConfigId = getEnvVar("METRICS_ADVISOR_DETECTION_CONFIG_ID");
    this.incidentId = getEnvVar("METRICS_ADVISOR_INCIDENT_ID");
  }

  public async globalSetup() {
    await super.globalSetup();
    await executeParallel(
      async (_count: number, _parallelIndex: number) => {},
      this.options.count.value!,
      32
    );
  }

  async runAsync(): Promise<void> {
    const result = await this.client.getIncidentRootCauses(this.detectionConfigId, this.incidentId);
    for (const rootcause of result.rootCauses) {
      console.log(`Root cause`);
      console.log(`  Trace the path for the incident root cause ${rootcause.path.join(" => ")}`);
      console.log(`  Series key: ${rootcause.seriesKey}`);
    }
  }
}
