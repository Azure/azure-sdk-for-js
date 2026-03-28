// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all available SKU for a given API Management service
 *
 * @summary gets all available SKU for a given API Management service
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListSKUs-Consumption.json
 */
async function apiManagementListSKUsConsumption() {
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
async function apiManagementListSKUsDedicated() {
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

async function main() {
  await apiManagementListSKUsConsumption();
  await apiManagementListSKUsDedicated();
}

main().catch(console.error);
