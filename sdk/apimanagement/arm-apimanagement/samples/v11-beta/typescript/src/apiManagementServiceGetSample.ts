// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an API Management service resource description.
 *
 * @summary gets an API Management service resource description.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceGetMultiRegionInternalVnet.json
 */
async function apiManagementServiceGetMultiRegionInternalVnet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.get("rg1", "apimService1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets an API Management service resource description.
 *
 * @summary gets an API Management service resource description.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceGetService.json
 */
async function apiManagementServiceGetService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.get("rg1", "apimService1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets an API Management service resource description.
 *
 * @summary gets an API Management service resource description.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceGetServiceHavingMsi.json
 */
async function apiManagementServiceGetServiceHavingMsi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.get("rg1", "apimService1");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementServiceGetMultiRegionInternalVnet();
  await apiManagementServiceGetService();
  await apiManagementServiceGetServiceHavingMsi();
}

main().catch(console.error);
