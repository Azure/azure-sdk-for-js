// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of Microsoft.ApiManagement SKUs available for your Subscription.
 *
 * @summary gets the list of Microsoft.ApiManagement SKUs available for your Subscription.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListSku.json
 */
async function listsAllAvailableResourceSKUs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiManagementSkus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllAvailableResourceSKUs();
}

main().catch(console.error);
