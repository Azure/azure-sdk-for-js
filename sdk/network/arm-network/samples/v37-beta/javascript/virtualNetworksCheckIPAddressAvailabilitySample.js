// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks whether a private IP address is available for use.
 *
 * @summary checks whether a private IP address is available for use.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCheckIPAddressAvailability.json
 */
async function checkIPAddressAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.checkIPAddressAvailability(
    "rg1",
    "test-vnet",
    "10.0.1.4",
  );
  console.log(result);
}

async function main() {
  await checkIPAddressAvailability();
}

main().catch(console.error);
