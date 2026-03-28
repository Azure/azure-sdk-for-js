// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified API from the specified Gateway.
 *
 * @summary deletes the specified API from the specified Gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteGatewayApi.json
 */
async function apiManagementDeleteGatewayApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gatewayApi.delete("rg1", "apimService1", "gw1", "echo-api");
}

async function main() {
  await apiManagementDeleteGatewayApi();
}

main().catch(console.error);
