import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { TablesTest } from "./tables.spec";
import { TransactionAction } from "@azure/data-tables";
import { createBatch } from "./utils/createBaseEntity";

interface TablesCreateSimpleEntityBatchTestOptions {
  batchSize: number;
}

export class CreateSimpleEntityBatchTest extends TablesTest<
  TablesCreateSimpleEntityBatchTestOptions
> {
  public options: PerfOptionDictionary<TablesCreateSimpleEntityBatchTestOptions> = {
    batchSize: {
      defaultValue: 100,
      longName: "batchSize",
      shortName: "s",
      description: "Number of entities to batch create. Defaults to 100"
    }
  };

  constructor() {
    super("CreateSimpleEntityBatchPerf");
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
  }

  public async globalCleanup() {
    await super.globalCleanup();
  }

  async run(): Promise<void> {
    const batches: TransactionAction[][] = createBatch(
      "simple",
      this.parsedOptions.batchSize.value!
    );

    for (const batch of batches) {
      await this.client.submitTransaction(batch);
    }
  }
}
