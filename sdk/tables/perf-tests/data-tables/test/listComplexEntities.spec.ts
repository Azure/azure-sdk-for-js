import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { TablesTest } from "./tables.spec";
import {TableEntityResult, TransactionAction } from "@azure/data-tables";
import { createBatch } from "./utils/createBaseEntity";

interface ListComplexEntitiesTestOptions {
    entityCount: number;
}

export class ListComplexEntitiesTest extends TablesTest<ListComplexEntitiesTestOptions> {
  public options: PerfStressOptionDictionary<ListComplexEntitiesTestOptions> = {
    entityCount: {
      defaultValue: 100,
      longName: "entityCount",
      shortName: "ec",
      description: "Number of entities to list. Defaults to 100"
    }
  };

  constructor() {
    super("ListComplexEntityPerf");
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
    let batches: TransactionAction[][] = createBatch("complex", this.parsedOptions.entityCount.value!);

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
