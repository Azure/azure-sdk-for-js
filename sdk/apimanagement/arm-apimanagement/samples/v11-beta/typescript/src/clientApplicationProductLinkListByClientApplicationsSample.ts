// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of product links associated with the specified client application.
 *
 * @summary lists a collection of product links associated with the specified client application.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListClientApplicationProductLinks.json
 */
async function apiManagementListProducts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clientApplicationProductLink.listByClientApplications(
    "rg1",
    "apimService1",
    "testAppId",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListProducts();
}

main().catch(console.error);
