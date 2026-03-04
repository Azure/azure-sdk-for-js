// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest, getEnvVar } from "@azure-tools/test-perf";
import { WidgetAnalyticsClient } from "@azure/template";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

export abstract class TemplateTest<TOptions> extends PerfTest<TOptions> {
  templateClient: WidgetAnalyticsClient;

  constructor() {
    super();

    const endpointUrl = getEnvVar("TEMPLATE_ENDPOINT_URL");
    this.templateClient = new WidgetAnalyticsClient(endpointUrl, new DefaultAzureCredential());
  }
}
