// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists available Ssl options for configuring Ssl policy.
 *
 * @summary lists available Ssl options for configuring Ssl policy.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayAvailableSslOptionsGet.json
 */
async function getAvailableSslOptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.listAvailableSslOptions();
  console.log(result);
}

async function main() {
  await getAvailableSslOptions();
}

main().catch(console.error);
