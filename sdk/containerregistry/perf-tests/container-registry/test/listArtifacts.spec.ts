// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary, getEnvVar } from "@azure/test-utils-perfstress";
import { ContainerRepository } from "@azure/container-registry";
import { ContainerRegistryTest, ContainerRegistryTestOptions } from "./client.spec";

export class ArtifactListTest extends ContainerRegistryTest<ContainerRegistryTestOptions> {
  repository: ContainerRepository;
  public options: PerfStressOptionDictionary<ContainerRegistryTestOptions> = {};
  constructor() {
    super();
    this.repository = this.client.getRepository(getEnvVar("REPOSITORY_NAME"));
  }

  async runAsync(): Promise<void> {
    const listIterator = this.repository.listManifestProperties();

    for await (const manifest of listIterator) {
      this.repository.getArtifact(manifest.digest);
    }
  }
}
