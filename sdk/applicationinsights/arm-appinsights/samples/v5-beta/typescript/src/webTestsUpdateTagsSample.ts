// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the tags associated with an Application Insights web test.
 *
 * @summary updates the tags associated with an Application Insights web test.
 * x-ms-original-file: 2022-06-15/WebTestUpdateTagsOnly.json
 */
async function webTestUpdateTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.webTests.updateTags("my-resource-group", "my-webtest-my-component", {
    tags: {
      Color: "AzureBlue",
      "CustomField-01": "This is a random value",
      SystemType: "A08",
      "hidden-link:/subscriptions/subid/resourceGroups/my-resource-group/providers/Microsoft.Insights/components/my-component":
        "Resource",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await webTestUpdateTags();
}

main().catch(console.error);
