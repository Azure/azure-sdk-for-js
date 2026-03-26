// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops the specified application gateway in a resource group.
 *
 * @summary stops the specified application gateway in a resource group.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayStop.json
 */
async function stopApplicationGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.applicationGateways.stop("rg1", "appgw");
}

async function main() {
  await stopApplicationGateway();
}

main().catch(console.error);
