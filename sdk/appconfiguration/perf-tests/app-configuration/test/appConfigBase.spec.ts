import { PerfTest, getEnvVar } from "@azure/test-utils-perf";
import { AppConfigurationClient } from "@azure/app-configuration";
// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class AppConfigTest<TOptions> extends PerfTest<TOptions> {
  client: AppConfigurationClient;

  constructor() {
    super();
    const connectionString = getEnvVar("APPCONFIG_CONNECTION_STRING");
    this.client = new AppConfigurationClient(connectionString);
  }
}
