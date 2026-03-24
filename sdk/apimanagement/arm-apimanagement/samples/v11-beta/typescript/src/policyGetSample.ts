// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Global policy definition of the Api Management service.
 *
 * @summary get the Global policy definition of the Api Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetPolicy.json
 */
async function apiManagementGetPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policy.get("rg1", "apimService1", "policy");
  console.log(result);
}

/**
 * This sample demonstrates how to get the Global policy definition of the Api Management service.
 *
 * @summary get the Global policy definition of the Api Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetPolicyFormat.json
 */
async function apiManagementGetPolicyFormat(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policy.get("rg1", "apimService1", "policy");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetPolicy();
  await apiManagementGetPolicyFormat();
}

main().catch(console.error);
