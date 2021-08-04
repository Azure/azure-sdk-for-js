import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";

import { TableClient } from "@azure/data-tables";

export abstract class TablesTest<TOptions = Record<string, unknown>> extends PerfStressTest<
  TOptions
> {
  client: TableClient;
  constructor(tableName: string) {
    super();
    const connectionString = getEnvVar("SAS_CONNECTION_STRING");
    this.client = TableClient.fromConnectionString(connectionString, tableName);
  }

  public async globalSetup() {
    await this.client.createTable();
  }

  public async globalCleanup() {
    await this.client.deleteTable();
  }
}
