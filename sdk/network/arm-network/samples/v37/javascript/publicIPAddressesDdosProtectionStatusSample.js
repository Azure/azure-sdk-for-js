// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Ddos Protection Status of a Public IP Address
 *
 * @summary gets the Ddos Protection Status of a Public IP Address
 * x-ms-original-file: 2025-05-01/PublicIpAddressGetDdosProtectionStatus.json
 */
async function getDdosProtectionStatusOfAPublicIPAddress() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.ddosProtectionStatus("rg1", "test-pip");
  console.log(result);
}

async function main() {
  await getDdosProtectionStatusOfAPublicIPAddress();
}

main().catch(console.error);
