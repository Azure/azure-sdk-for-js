// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationClient } from "@azure/app-configuration";
import { PerfTest, getEnvVar } from "@azure-tools/test-perf";
import { WidgetAnalyticsClient } from "@azure/template";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

export abstract class TemplateTest<TOptions> extends PerfTest<TOptions> {
  // Since the template project's client has been refactored to WidgetAnalyticsClient,
  // we also create an AppConfigurationClient for setup and teardown purposes.
  templateClient: WidgetAnalyticsClient;
  appConfigurationClient: AppConfigurationClient;

  constructor() {
    super();

    const endpointUrl = getEnvVar("TEMPLATE_ENDPOINT_URL");
    this.templateClient = new WidgetAnalyticsClient(endpointUrl, new DefaultAzureCredential());
    this.appConfigurationClient = new AppConfigurationClient(
      endpointUrl,
      new DefaultAzureCredential(),
    );
  }
}
