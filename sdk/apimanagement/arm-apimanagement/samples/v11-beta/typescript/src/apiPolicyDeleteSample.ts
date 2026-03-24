// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the policy configuration at the Api.
 *
 * @summary deletes the policy configuration at the Api.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiPolicy.json
 */
async function apiManagementDeleteApiPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiPolicy.delete("rg1", "apimService1", "loggerId", "policy", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteApiPolicy();
}

main().catch(console.error);
