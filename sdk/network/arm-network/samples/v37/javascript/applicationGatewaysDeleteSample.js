// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified application gateway.
 *
 * @summary deletes the specified application gateway.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayDelete.json
 */
async function deleteApplicationGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.applicationGateways.delete("rg1", "appgw");
}

async function main() {
  await deleteApplicationGateway();
}

main().catch(console.error);
