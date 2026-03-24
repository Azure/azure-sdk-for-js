// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the policy configuration at the Product.
 *
 * @summary deletes the policy configuration at the Product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteProductPolicy.json
 */
async function apiManagementDeleteProductPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.productPolicy.delete("rg1", "apimService1", "testproduct", "policy", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteProductPolicy();
}

main().catch(console.error);
