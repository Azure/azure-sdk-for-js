import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { TablesTest } from "./tables.spec";
import { TableEntity } from "@azure/data-tables";
import { createComplexEntity } from "./utils/createBaseEntity";

export class CreateComplexEntityTest extends TablesTest {
  public options: PerfStressOptionDictionary = {};

  constructor() {
    super("ComplexEntityPerf");
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
  }

  public async globalCleanup() {
    await super.globalCleanup();
  }

  async runAsync(): Promise<void> {
    const complexEntity: TableEntity = createComplexEntity();
    await this.client.createEntity(complexEntity);
  }
}
