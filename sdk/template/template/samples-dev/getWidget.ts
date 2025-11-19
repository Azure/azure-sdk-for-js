// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary The summary tag will be used by our sample publishing tool to provide a description in the samples' README.
 */

import { WidgetAnalyticsClient } from "@azure/template";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

async function main(): Promise<void> {
  const endpoint = process.env["WIDGET_ANALYTICS_ENDPOINT"] || "<your service endpoint>";
  const client = new WidgetAnalyticsClient(endpoint, new DefaultAzureCredential());

  const widgetId = "widgetId";
  const result = await client.widgets.getWidget(widgetId);
  console.log(result);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
