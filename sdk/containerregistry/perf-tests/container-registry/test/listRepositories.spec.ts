// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { ContainerRegistryTest, ContainerRegistryTestOptions } from "./client.spec";

export class RepositoryListTest extends ContainerRegistryTest<ContainerRegistryTestOptions> {
  public options: PerfStressOptionDictionary<ContainerRegistryTestOptions> = {};
  constructor() {
    super();
  }

  async runAsync(): Promise<void> {
    const listIterator = this.client.listRepositoryNames();

    // eslint-disable-next-line no-empty
    for await (const _repositoryName of listIterator) {
    }
  }
}
