// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Products, which the API is part of.
 *
 * @summary lists all Products, which the API is part of.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiProducts.json
 */
async function apiManagementListApiProducts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiProduct.listByApis(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListApiProducts();
}

main().catch(console.error);
