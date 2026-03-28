// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing API Management gateway config connection.
 *
 * @summary deletes an existing API Management gateway config connection.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteGatewayConfigConnection.json
 */
async function apiManagementGatewayDeleteGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiGatewayConfigConnection.delete("rg1", "standard-gw-01", "gcc-01", "*");
}

async function main() {
  await apiManagementGatewayDeleteGateway();
}

main().catch(console.error);
