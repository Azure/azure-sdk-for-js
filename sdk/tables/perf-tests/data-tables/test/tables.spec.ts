import { PerfTest, getEnvVar } from "@azure/test-utils-perf";

import { TableClient } from "@azure/data-tables";

export abstract class TablesTest<TOptions = Record<string, unknown>> extends PerfTest<TOptions> {
  client: TableClient;
  constructor(tableName: string) {
    super();
    const connectionString = getEnvVar("SAS_CONNECTION_STRING");
    this.client = TableClient.fromConnectionString(
      connectionString,
      tableName,
      this.configureClientOptions({})
    );
  }

  public async globalSetup() {
    await this.client.createTable();
  }

  public async globalCleanup() {
    await this.client.deleteTable();
  }
}
