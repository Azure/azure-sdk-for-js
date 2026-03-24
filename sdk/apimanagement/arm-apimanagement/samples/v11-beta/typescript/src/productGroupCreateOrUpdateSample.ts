// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds the association between the specified developer group with the specified product.
 *
 * @summary adds the association between the specified developer group with the specified product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateProductGroup.json
 */
async function apiManagementCreateProductGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.productGroup.createOrUpdate(
    "rg1",
    "apimService1",
    "testproduct",
    "templateGroup",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateProductGroup();
}

main().catch(console.error);
