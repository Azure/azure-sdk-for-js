import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { TablesTest } from "./tables.spec";
import { createBaseEntity } from "./utils/createBaseEntity";

export class CreateSimpleEntityTest extends TablesTest {
  public options: PerfStressOptionDictionary = {};
  public static baseEntity = createBaseEntity();

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
    await this.client.createEntity(CreateSimpleEntityTest.baseEntity);
  }
}
