// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { TablesTest } from "./tables.spec.js";
import type { TableEntity } from "@azure/data-tables";
import { createSimpleEntity } from "./utils/createBaseEntity.js";

export class CreateSimpleEntityTest extends TablesTest {
  public options: PerfOptionDictionary = {};

  constructor() {
    super("SimpleEntityPerf");
  }

  public async globalSetup(): Promise<void> {
    await super.globalSetup(); // Calling base class' setup
  }

  public async globalCleanup(): Promise<void> {
    await super.globalCleanup();
  }

  async run(): Promise<void> {
    const simpleEntity: TableEntity = createSimpleEntity();
    await this.client.createEntity(simpleEntity);
  }
}
