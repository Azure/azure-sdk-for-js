// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all available SKU for a given API Management service
 *
 * @summary gets all available SKU for a given API Management service
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListSKUs-Consumption.json
 */
async function apiManagementListSKUsConsumption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiManagementServiceSkus.listAvailableServiceSkus(
    "rg1",
    "apimService1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all available SKU for a given API Management service
 *
 * @summary gets all available SKU for a given API Management service
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListSKUs-Dedicated.json
 */
async function apiManagementListSKUsDedicated(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiManagementServiceSkus.listAvailableServiceSkus(
    "rg1",
    "apimService1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListSKUsConsumption();
  await apiManagementListSKUsDedicated();
}

main().catch(console.error);
