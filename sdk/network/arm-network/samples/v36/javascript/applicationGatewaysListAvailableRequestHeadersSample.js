// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all available request headers.
 *
 * @summary Lists all available request headers.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ApplicationGatewayAvailableRequestHeadersGet.json
 */
async function getAvailableRequestHeaders() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "72f988bf-86f1-41af-91ab-2d7cd0dddd4";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.listAvailableRequestHeaders();
  console.log(result);
}

async function main() {
  await getAvailableRequestHeaders();
}

main().catch(console.error);
