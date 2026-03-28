// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds an API to the specified Gateway.
 *
 * @summary adds an API to the specified Gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGatewayApi.json
 */
async function apiManagementCreateGatewayApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gatewayApi.createOrUpdate("rg1", "apimService1", "gw1", "echo-api", {
    parameters: { provisioningState: "created" },
  });
  console.log(result);
}

async function main() {
  await apiManagementCreateGatewayApi();
}

main().catch(console.error);
