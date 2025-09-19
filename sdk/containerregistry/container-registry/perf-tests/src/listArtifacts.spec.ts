// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { getEnvVar } from "@azure-tools/test-perf";
import type { ContainerRepository } from "@azure/container-registry";
import type { ContainerRegistryTestOptions } from "./client.spec.js";
import { ContainerRegistryTest } from "./client.spec.js";

export class ArtifactListTest extends ContainerRegistryTest<ContainerRegistryTestOptions> {
  repository: ContainerRepository;
  public options: PerfOptionDictionary<ContainerRegistryTestOptions> = {};
  constructor() {
    super();
    this.repository = this.client.getRepository(getEnvVar("REPOSITORY_NAME"));
  }

  async run(): Promise<void> {
    const listIterator = this.repository.listManifestProperties();

    for await (const manifest of listIterator) {
      this.repository.getArtifact(manifest.digest);
    }
  }
}
