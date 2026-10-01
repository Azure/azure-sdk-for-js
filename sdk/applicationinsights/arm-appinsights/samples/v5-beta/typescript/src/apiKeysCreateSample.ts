// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create an API Key of an Application Insights component.
 *
 * @summary create an API Key of an Application Insights component.
 * x-ms-original-file: 2015-05-01/APIKeysCreate.json
 */
async function apiKeyCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.apiKeys.create("my-resource-group", "my-component", {
    name: "test2",
    linkedReadProperties: [
      "/subscriptions/subid/resourceGroups/my-resource-group/providers/Microsoft.Insights/components/my-component/api",
      "/subscriptions/subid/resourceGroups/my-resource-group/providers/Microsoft.Insights/components/my-component/agentconfig",
    ],
    linkedWriteProperties: [
      "/subscriptions/subid/resourceGroups/my-resource-group/providers/Microsoft.Insights/components/my-component/annotations",
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiKeyCreate();
}

main().catch(console.error);
