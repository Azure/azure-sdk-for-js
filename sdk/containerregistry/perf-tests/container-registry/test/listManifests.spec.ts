// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary, getEnvVar } from "@azure/test-utils-perfstress";
import { ContainerRepository } from "@azure/container-registry";
import { MetricsAdvisorTest } from "./client.spec";
type ContainerRegistryTestOptions = Record<string, unknown>;

export class ArtifactListTest extends MetricsAdvisorTest<ContainerRegistryTestOptions> {
  repository: ContainerRepository;
  public options: PerfStressOptionDictionary<ContainerRegistryTestOptions> = {};
  constructor() {
    super();
    this.repository = this.client.getRepository(getEnvVar("REPOSITORY_NAME"));
  }

  async runAsync(): Promise<void> {
    const listIterator = this.repository.listManifestProperties();

    // eslint-disable-next-line no-empty
    for await (const manifest of listIterator) {
      const artifact = this.repository.getArtifact(manifest.digest);
    }
  }
}
