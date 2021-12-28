// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigurationClient } from "@azure/app-configuration";
import { PerfTest, getEnvVar } from "@azure/test-utils-perf";
import { ConfigurationClient } from "@azure/template";
import { DefaultAzureCredential } from "@azure/identity";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class TemplateTest<TOptions> extends PerfTest<TOptions> {
  // Since the template project's client is limited in scope (and only supports getConfigurationSetting),
  // we also create an AppConfigurationClient for setup and teardown purposes.
  templateClient: ConfigurationClient;
  appConfigurationClient: AppConfigurationClient;

  constructor() {
    super();

    const endpointUrl = getEnvVar("TEMPLATE_ENDPOINT_URL");
    this.templateClient = new ConfigurationClient(endpointUrl, new DefaultAzureCredential());
    this.appConfigurationClient = new AppConfigurationClient(
      endpointUrl,
      new DefaultAzureCredential()
    );
  }
}
