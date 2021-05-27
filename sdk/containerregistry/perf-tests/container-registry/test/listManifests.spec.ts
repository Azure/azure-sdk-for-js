// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary, getEnvVar } from "@azure/test-utils-perfstress";
import { ContainerRepository } from "@azure/container-registry";
import { MetricsAdvisorTest } from "./client.spec";
type MetricsAdvisorTestOptions = Record<string, unknown>;

export class ManifestListTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  repository: ContainerRepository;
  public options: PerfStressOptionDictionary<MetricsAdvisorTestOptions> = {};
  constructor() {
    super();
    this.repository = this.client.getRepository(getEnvVar("REPOSITORY_NAME"));
  }

  async runAsync(): Promise<void> {
    const listIterator = this.repository.listManifestProperties();

    // eslint-disable-next-line no-empty
    for await (const _incident of listIterator) {
    }
  }
}
