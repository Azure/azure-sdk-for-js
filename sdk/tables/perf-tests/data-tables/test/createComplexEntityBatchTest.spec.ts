import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { TablesTest } from "./tables.spec";
import {TransactionAction } from "@azure/data-tables";
import { createBatch } from "./utils/createBaseEntity";

interface TablesCreateComplexEntityBatchTestOptions {
  batchSize: number;
}

export class CreateComplexEntityBatchTest extends TablesTest<TablesCreateComplexEntityBatchTestOptions> {
  public options: PerfStressOptionDictionary<TablesCreateComplexEntityBatchTestOptions> = {
    batchSize: {
      defaultValue: 100,
      longName: "batchSize",
      shortName: "s",
      description: "Number of entities to batch create. Defaults to 100"
    }
  };

  constructor() {
    super("CreateComplexEntityBatchPerf");
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
  }

  public async globalCleanup() {
    await super.globalCleanup();
  }

  async runAsync(): Promise<void> {
    let batches: TransactionAction[][] = createBatch("complex", this.parsedOptions.batchSize.value!);

    for(const batch of batches) {
        await this.client.submitTransaction(batch);
    }
  }
}
