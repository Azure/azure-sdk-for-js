// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { getEnvVar, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { RegistryArtifact } from "@azure/container-registry";
import { MetricsAdvisorTest } from "./client.spec";
type MetricsAdvisorTestOptions = Record<string, unknown>;

export class TagListTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  artifact: RegistryArtifact;
  public options: PerfStressOptionDictionary<MetricsAdvisorTestOptions> = {};
  constructor() {
    super();
    this.artifact = this.client.getArtifact(getEnvVar("REPOSITORY_NAME"), "latest");
  }

  async runAsync(): Promise<void> {
    const result = this.artifact.listTagProperties();
    // eslint-disable-next-line no-empty
    for await (const _rootcause of result) {
    }
  }
}
