import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { TablesTest } from "./tables.spec";
import { TableEntity } from "@azure/data-tables";
import { createBaseEntity } from "./utils/createBaseEntity";

export class CreateSimpleEntityTest extends TablesTest {
  public options: PerfStressOptionDictionary = {};

  constructor() {
    super("SimpleEntityPerf");
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
  }

  public async globalCleanup() {
    await super.globalCleanup();
  }

  async runAsync(): Promise<void> {
    const simpleEntity: TableEntity = createBaseEntity();
    await this.client.createEntity(simpleEntity);
  }
}
