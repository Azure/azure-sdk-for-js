// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about all public IP addresses in a role instance IP configuration in a cloud service.
 *
 * @summary gets information about all public IP addresses in a role instance IP configuration in a cloud service.
 * x-ms-original-file: 2025-05-01/CloudServiceRoleInstancePublicIpList.json
 */
async function listVmssvmPublicIP() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publicIPAddresses.listCloudServiceRoleInstancePublicIPAddresses(
    "cs-tester",
    "cs1",
    "Test_VM_0",
    "nic1",
    "ip1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVmssvmPublicIP();
}

main().catch(console.error);
