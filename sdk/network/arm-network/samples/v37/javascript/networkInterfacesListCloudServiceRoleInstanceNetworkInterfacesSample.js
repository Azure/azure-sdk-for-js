// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about all network interfaces in a role instance in a cloud service.
 *
 * @summary gets information about all network interfaces in a role instance in a cloud service.
 * x-ms-original-file: 2025-05-01/CloudServiceRoleInstanceNetworkInterfaceList.json
 */
async function listCloudServiceRoleInstanceNetworkInterfaces() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaces.listCloudServiceRoleInstanceNetworkInterfaces(
    "rg1",
    "cs1",
    "TestVMRole_IN_0",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCloudServiceRoleInstanceNetworkInterfaces();
}

main().catch(console.error);
