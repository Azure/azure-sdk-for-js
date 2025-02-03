// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest, getEnvVar } from "@azure-tools/test-perf";
import { AppConfigurationClient } from "@azure/app-configuration";
import "dotenv/config";

export abstract class AppConfigTest<TOptions> extends PerfTest<TOptions> {
  client: AppConfigurationClient;

  constructor() {
    super();
    const connectionString = getEnvVar("APPCONFIG_CONNECTION_STRING");
    this.client = new AppConfigurationClient(connectionString);
  }
}
