// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import type { ContainerRegistryTestOptions } from "./client.spec.js";
import { ContainerRegistryTest } from "./client.spec.js";

export class RepositoryListTest extends ContainerRegistryTest<ContainerRegistryTestOptions> {
  public options: PerfOptionDictionary<ContainerRegistryTestOptions> = {};

  async run(): Promise<void> {
    const listIterator = this.client.listRepositoryNames();

    for await (const _repositoryName of listIterator) {
      // Do nothing
    }
  }
}
