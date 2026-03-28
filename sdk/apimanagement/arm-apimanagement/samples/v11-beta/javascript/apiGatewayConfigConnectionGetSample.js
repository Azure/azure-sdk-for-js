// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an API Management gateway config connection resource description.
 *
 * @summary gets an API Management gateway config connection resource description.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGatewayConfigConnection.json
 */
async function apiManagementGetGatewayConfigConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGatewayConfigConnection.get("rg1", "standard-gw-01", "gcc-01");
  console.log(result);
}

async function main() {
  await apiManagementGetGatewayConfigConnection();
}

main().catch(console.error);
