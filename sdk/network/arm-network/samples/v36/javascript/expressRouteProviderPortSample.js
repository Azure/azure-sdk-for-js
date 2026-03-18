// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves detail of a provider port.
 *
 * @summary Retrieves detail of a provider port.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/expressRouteProviderPort.json
 */
async function expressRouteProviderPort() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const providerport = "abc";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteProviderPort(providerport);
  console.log(result);
}

async function main() {
  await expressRouteProviderPort();
}

main().catch(console.error);
