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
  detectionConfigId: string;
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
    this.detectionConfigId = getEnvVar("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID");
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
    // for await (const segmentResponse of this.containerClient.listBlobsFlat().byPage()) {
    //   for (const _ of segmentResponse.segment.blobItems) {
    //   }
    // }
    await this.client.listAnomalies(
      this.detectionConfigId,
      new Date(Date.UTC(2020, 0, 5)),
      new Date(Date.UTC(2021, 3, 11))
    );
  }
}
