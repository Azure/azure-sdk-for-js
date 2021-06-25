import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import { AppConfigurationClient } from "@azure/app-configuration";
// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class AppConfigTest<TOptions> extends PerfStressTest<TOptions> {
  client: AppConfigurationClient;

  constructor() {
    super();
    const connectionString = getEnvVar("APPCONFIG_CONNECTION_STRING");
    this.client = new AppConfigurationClient(connectionString);
  }
}
