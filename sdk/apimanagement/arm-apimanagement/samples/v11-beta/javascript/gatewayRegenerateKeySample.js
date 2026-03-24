// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates specified gateway key invalidating any tokens created with it.
 *
 * @summary regenerates specified gateway key invalidating any tokens created with it.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGatewayRegenerateKey.json
 */
async function apiManagementGatewayRegenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gateway.regenerateKey("rg1", "apimService1", "gwId", { keyType: "primary" });
}

async function main() {
  await apiManagementGatewayRegenerateKey();
}

main().catch(console.error);
