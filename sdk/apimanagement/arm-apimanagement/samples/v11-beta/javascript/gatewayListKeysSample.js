// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves gateway keys.
 *
 * @summary retrieves gateway keys.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGatewayListKeys.json
 */
async function apiManagementGatewayListKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.listKeys("rg1", "apimService1", "gw1");
  console.log(result);
}

async function main() {
  await apiManagementGatewayListKeys();
}

main().catch(console.error);
