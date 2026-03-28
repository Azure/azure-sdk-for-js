// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified hostname configuration from the specified Gateway.
 *
 * @summary deletes the specified hostname configuration from the specified Gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteGatewayHostnameConfiguration.json
 */
async function apiManagementDeleteGatewayHostnameConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gatewayHostnameConfiguration.delete("rg1", "apimService1", "gw1", "default", "*");
}

async function main() {
  await apiManagementDeleteGatewayHostnameConfiguration();
}

main().catch(console.error);
