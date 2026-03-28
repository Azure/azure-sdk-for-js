// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an API Management gateway hostname binding resource description.
 *
 * @summary gets an API Management gateway hostname binding resource description.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGatewayHostnameBinding.json
 */
async function apiManagementGetGatewayHostnameBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGatewayHostnameBinding.get("rg1", "standard-gw-1", "hb-1");
  console.log(result);
}

async function main() {
  await apiManagementGetGatewayHostnameBinding();
}

main().catch(console.error);
