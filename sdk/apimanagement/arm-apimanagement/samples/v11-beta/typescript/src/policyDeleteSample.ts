// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the global policy configuration of the Api Management Service.
 *
 * @summary deletes the global policy configuration of the Api Management Service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeletePolicy.json
 */
async function apiManagementDeletePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.policy.delete("rg1", "apimService1", "policy", "*");
}

async function main(): Promise<void> {
  await apiManagementDeletePolicy();
}

main().catch(console.error);
