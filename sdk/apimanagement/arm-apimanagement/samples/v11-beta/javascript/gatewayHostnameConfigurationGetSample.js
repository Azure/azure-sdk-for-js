// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get details of a hostname configuration
 *
 * @summary get details of a hostname configuration
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGatewayHostnameConfiguration.json
 */
async function apiManagementGetGatewayHostnameConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gatewayHostnameConfiguration.get(
    "rg1",
    "apimService1",
    "gw1",
    "default",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetGatewayHostnameConfiguration();
}

main().catch(console.error);
