// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all available request headers.
 *
 * @summary lists all available request headers.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayAvailableRequestHeadersGet.json
 */
async function getAvailableRequestHeaders() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.listAvailableRequestHeaders();
  console.log(result);
}

async function main() {
  await getAvailableRequestHeaders();
}

main().catch(console.error);
