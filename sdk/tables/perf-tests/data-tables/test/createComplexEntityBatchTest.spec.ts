import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { TablesTest } from "./tables.spec";
import { TransactionAction } from "@azure/data-tables";
import { createBatch } from "./utils/createBaseEntity";

interface TablesCreateComplexEntityBatchTestOptions {
  batchSize: number;
}

export class CreateComplexEntityBatchTest extends TablesTest<TablesCreateComplexEntityBatchTestOptions> {
  public options: PerfOptionDictionary<TablesCreateComplexEntityBatchTestOptions> = {
    batchSize: {
      defaultValue: 100,
      longName: "batchSize",
      shortName: "s",
      description: "Number of entities to batch create. Defaults to 100",
    },
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

  async run(): Promise<void> {
    const batches: TransactionAction[][] = createBatch(
      "complex",
      this.parsedOptions.batchSize.value!
    );

    for (const batch of batches) {
      await this.client.submitTransaction(batch);
    }
  }
}
