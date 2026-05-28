// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an API Key of an Application Insights component.
 *
 * @summary delete an API Key of an Application Insights component.
 * x-ms-original-file: 2015-05-01/APIKeysDelete.json
 */
async function apiKeyDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.apiKeys.delete(
    "my-resource-group",
    "my-component",
    "bb820f1b-3110-4a8b-ba2c-8c1129d7eb6a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiKeyDelete();
}

main().catch(console.error);
