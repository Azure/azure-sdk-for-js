import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { TablesTest } from "./tables.spec";
import { TableEntity } from "@azure/data-tables";
import { createComplexEntity } from "./utils/createBaseEntity";

export class CreateComplexEntityTest extends TablesTest {
  public options: PerfOptionDictionary = {};

  constructor() {
    super("ComplexEntityPerf");
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
  }

  public async globalCleanup() {
    await super.globalCleanup();
  }

  async run(): Promise<void> {
    const complexEntity: TableEntity = createComplexEntity();
    await this.client.createEntity(complexEntity);
  }
}
