import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import { AppConfigurationClient } from "@azure/app-configuration";

export abstract class AppConfigTest<TOptions> extends PerfStressTest<TOptions> {
  client: AppConfigurationClient;

  constructor() {
    super();
    const connectionString = getEnvVar("APPCONFIG_CONNECTION_STRING");
    this.client = new AppConfigurationClient(connectionString);
  }

  public async globalSetup() {}

  public async globalCleanup() {}
}
