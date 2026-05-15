// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all network security groups in a subscription.
 *
 * @summary gets all network security groups in a subscription.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupListAll.json
 */
async function listAllNetworkSecurityGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityGroups.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllNetworkSecurityGroups();
}

main().catch(console.error);
