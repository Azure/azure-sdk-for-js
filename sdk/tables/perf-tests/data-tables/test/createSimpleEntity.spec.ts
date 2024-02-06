import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { TablesTest } from "./tables.spec";
import { TableEntity } from "@azure/data-tables";
import { createSimpleEntity } from "./utils/createBaseEntity";

export class CreateSimpleEntityTest extends TablesTest {
  public options: PerfOptionDictionary = {};

  constructor() {
    super("SimpleEntityPerf");
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
  }

  public async globalCleanup() {
    await super.globalCleanup();
  }

  async run(): Promise<void> {
    const simpleEntity: TableEntity = createSimpleEntity();
    await this.client.createEntity(simpleEntity);
  }
}
