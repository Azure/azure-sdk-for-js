// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the collection of subscriptions of the specified user.
 *
 * @summary lists the collection of subscriptions of the specified user.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListUserSubscriptions.json
 */
async function apiManagementListUserSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.userSubscription.list(
    "rg1",
    "apimService1",
    "57681833a40f7eb6c49f6acf",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListUserSubscriptions();
}

main().catch(console.error);
