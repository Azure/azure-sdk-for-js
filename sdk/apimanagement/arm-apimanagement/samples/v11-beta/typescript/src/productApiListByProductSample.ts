// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of the APIs associated with a product.
 *
 * @summary lists a collection of the APIs associated with a product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListProductApis.json
 */
async function apiManagementListProductApis(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.productApi.listByProduct(
    "rg1",
    "apimService1",
    "5768181ea40f7eb6c49f6ac7",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListProductApis();
}

main().catch(console.error);
