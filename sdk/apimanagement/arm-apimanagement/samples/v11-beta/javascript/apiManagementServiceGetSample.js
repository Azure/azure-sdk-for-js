// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an API Management service resource description.
 *
 * @summary gets an API Management service resource description.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceGetMultiRegionInternalVnet.json
 */
async function apiManagementServiceGetMultiRegionInternalVnet() {
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
async function apiManagementServiceGetService() {
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
async function apiManagementServiceGetServiceHavingMsi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.get("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementServiceGetMultiRegionInternalVnet();
  await apiManagementServiceGetService();
  await apiManagementServiceGetServiceHavingMsi();
}

main().catch(console.error);
