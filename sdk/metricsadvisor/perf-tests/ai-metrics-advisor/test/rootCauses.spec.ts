// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfOptionDictionary, getEnvVar } from "@azure/test-utils-perf";
import { MetricsAdvisorTest } from "./metricsAdvisor.spec";
type MetricsAdvisorTestOptions = Record<string, unknown>;

export class RootCauseTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  detectionConfigId: string;
  incidentId: string;
  public options: PerfOptionDictionary<MetricsAdvisorTestOptions> = {};
  constructor() {
    super();
    this.detectionConfigId = getEnvVar("METRICS_ADVISOR_DETECTION_CONFIG_ID");
    this.incidentId = getEnvVar("METRICS_ADVISOR_INCIDENT_ID");
  }

  async run(): Promise<void> {
    const result = await this.client.getIncidentRootCauses(this.detectionConfigId, this.incidentId);
    // eslint-disable-next-line no-empty
    for (const _rootcause of result.rootCauses) {
    }
  }
}
