// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all Application Insights components within a subscription.
 *
 * @summary gets a list of all Application Insights components within a subscription.
 * x-ms-original-file: 2025-01-23-preview/ComponentsList.json
 */
async function componentsListJson(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.components.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await componentsListJson();
}

main().catch(console.error);
