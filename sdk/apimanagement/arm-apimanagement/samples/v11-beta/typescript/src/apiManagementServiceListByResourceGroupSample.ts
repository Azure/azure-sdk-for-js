// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all API Management services within a resource group.
 *
 * @summary list all API Management services within a resource group.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListServiceBySubscriptionAndResourceGroup.json
 */
async function apiManagementListServiceBySubscriptionAndResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiManagementService.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListServiceBySubscriptionAndResourceGroup();
}

main().catch(console.error);
