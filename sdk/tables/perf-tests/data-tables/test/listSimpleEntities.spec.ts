import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { TablesTest } from "./tables.spec";
import {TableEntityResult, TransactionAction } from "@azure/data-tables";
import { createBatch } from "./utils/createBaseEntity";

interface ListSimpleEntitiesTestOptions {
    entityCount: number;
}

export class ListSimpleEntitiesTest extends TablesTest<ListSimpleEntitiesTestOptions> {
  public options: PerfStressOptionDictionary<ListSimpleEntitiesTestOptions> = {
    entityCount: {
      defaultValue: 100,
      longName: "entityCount",
      shortName: "ec",
      description: "Number of entities to list. Defaults to 100"
    }
  };

  constructor() {
    super("ListSimpleEntityPerf");
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
    let batches: TransactionAction[][] = createBatch("simple", this.parsedOptions.entityCount.value!);

    for(const batch of batches) {
        await this.client.submitTransaction(batch);
    }
  }

  public async globalCleanup() {
    await super.globalCleanup();
  }

  async runAsync(): Promise<void> {
    const iter = this.client.listEntities();
    const entities: TableEntityResult<Record<string, unknown>>[] = [];

    for await (const entity of iter) {
        entities.push(entity);
    }
  }
}
