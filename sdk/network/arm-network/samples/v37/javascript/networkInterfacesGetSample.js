// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified network interface.
 *
 * @summary gets information about the specified network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceGet.json
 */
async function getNetworkInterface() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.get("rg1", "test-nic");
  console.log(result);
}

async function main() {
  await getNetworkInterface();
}

main().catch(console.error);
