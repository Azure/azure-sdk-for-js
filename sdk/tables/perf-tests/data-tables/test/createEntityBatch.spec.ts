import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { TablesTest } from "./tables.spec";
import { TransactionAction } from "@azure/data-tables";
import { createSimpleEntity } from "./utils/createBaseEntity";

interface TablesCreateEntityBatchTestOptions {
  batchSize: number;
}

export class CreateEntityBatchTest extends TablesTest<TablesCreateEntityBatchTestOptions> {
  public options: PerfStressOptionDictionary<TablesCreateEntityBatchTestOptions> = {
    batchSize: {
      defaultValue: 100,
      longName: "batchSize",
      shortName: "s",
      description: "Number of entities to batch create. Defaults to 100"
    }
  };

  constructor() {
    super("CreateEntityBatchPerf");
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
  }

  public async globalCleanup() {
    await super.globalCleanup();
  }

  async runAsync(): Promise<void> {
    let batchSize = 0;
    let batch: TransactionAction[] = [];

    for (let i = 0; i < this.parsedOptions.batchSize.value!; i++) {
      batch.push(["create", createSimpleEntity()]);
      batchSize++;
      if (batchSize >= 100) {
        await this.client.submitTransaction(batch);
        batch = [];
        batchSize = 0;
      }
    }

    if (batchSize) {
      await this.client.submitTransaction(batch);
    }
  }
}
