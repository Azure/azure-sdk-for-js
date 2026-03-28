// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing API Management service.
 *
 * @summary deletes an existing API Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceDeleteService.json
 */
async function apiManagementServiceDeleteService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.delete("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementServiceDeleteService();
}

main().catch(console.error);
