// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an API Management gateway resource description.
 *
 * @summary gets an API Management gateway resource description.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGatewayGetGateway.json
 */
async function apiManagementGatewayGetGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGateway.get("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementGatewayGetGateway();
}

main().catch(console.error);
