// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific Gateway.
 *
 * @summary deletes specific Gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteGateway.json
 */
async function apiManagementDeleteGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gateway.delete("rg1", "apimService1", "gw1", "*");
}

async function main() {
  await apiManagementDeleteGateway();
}

main().catch(console.error);
