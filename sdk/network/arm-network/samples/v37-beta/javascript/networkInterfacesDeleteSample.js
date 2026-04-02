// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified network interface.
 *
 * @summary deletes the specified network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceDelete.json
 */
async function deleteNetworkInterface() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkInterfaces.delete("rg1", "test-nic");
}

async function main() {
  await deleteNetworkInterface();
}

main().catch(console.error);
