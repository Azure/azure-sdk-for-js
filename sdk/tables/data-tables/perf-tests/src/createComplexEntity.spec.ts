// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { TablesTest } from "./tables.spec.js";
import type { TableEntity } from "@azure/data-tables";
import { createComplexEntity } from "./utils/createBaseEntity.js";

export class CreateComplexEntityTest extends TablesTest {
  public options: PerfOptionDictionary = {};

  constructor() {
    super("ComplexEntityPerf");
  }

  public async globalSetup(): Promise<void> {
    await super.globalSetup(); // Calling base class' setup
  }

  public async globalCleanup(): Promise<void> {
    await super.globalCleanup();
  }

  async run(): Promise<void> {
    const complexEntity: TableEntity = createComplexEntity();
    await this.client.createEntity(complexEntity);
  }
}
