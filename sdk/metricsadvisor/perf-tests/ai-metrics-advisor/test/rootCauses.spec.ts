// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary, getEnvVar } from "@azure/test-utils-perfstress";
import { MetricsAdvisorTest } from "./metricsAdvisor.spec";
interface MetricsAdvisorTestOptions {
}

export class RootCauseTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  detectionConfigId: string;
  incidentId: string;
  public options: PerfStressOptionDictionary<MetricsAdvisorTestOptions> = {
  };
  constructor() {
    super();
    this.detectionConfigId = getEnvVar("METRICS_ADVISOR_DETECTION_CONFIG_ID");
    this.incidentId = getEnvVar("METRICS_ADVISOR_INCIDENT_ID");
  }

  async runAsync(): Promise<void> {
    await this.client.getIncidentRootCauses(this.detectionConfigId, this.incidentId);
  }
}
