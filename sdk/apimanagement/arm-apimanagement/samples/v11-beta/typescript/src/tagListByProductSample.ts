// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Tags associated with the Product.
 *
 * @summary lists all Tags associated with the Product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListProductTags.json
 */
async function apiManagementListProductTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tag.listByProduct(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListProductTags();
}

main().catch(console.error);
