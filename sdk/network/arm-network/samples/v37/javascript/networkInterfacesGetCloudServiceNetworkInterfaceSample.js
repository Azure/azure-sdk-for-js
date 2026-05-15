// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified network interface in a cloud service.
 *
 * @summary get the specified network interface in a cloud service.
 * x-ms-original-file: 2025-05-01/CloudServiceNetworkInterfaceGet.json
 */
async function getCloudServiceNetworkInterface() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.getCloudServiceNetworkInterface(
    "rg1",
    "cs1",
    "TestVMRole_IN_0",
    "nic1",
  );
  console.log(result);
}

async function main() {
  await getCloudServiceNetworkInterface();
}

main().catch(console.error);
