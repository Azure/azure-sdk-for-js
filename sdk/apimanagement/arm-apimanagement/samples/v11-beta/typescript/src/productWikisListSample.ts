// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the Wiki for a Product specified by its identifier.
 *
 * @summary gets the details of the Wiki for a Product specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListProductWikis.json
 */
async function apiManagementGetApiWiki(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.productWikis.list(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementGetApiWiki();
}

main().catch(console.error);
