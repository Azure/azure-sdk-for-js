// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified public IP address in a cloud service.
 *
 * @summary get the specified public IP address in a cloud service.
 * x-ms-original-file: 2025-05-01/CloudServicePublicIpGet.json
 */
async function getVmssPublicIP() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.getCloudServicePublicIPAddress(
    "cs-tester",
    "cs1",
    "Test_VM_0",
    "nic1",
    "ip1",
    "pub1",
  );
  console.log(result);
}

async function main() {
  await getVmssPublicIP();
}

main().catch(console.error);
