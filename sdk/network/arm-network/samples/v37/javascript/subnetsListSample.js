// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all subnets in a virtual network.
 *
 * @summary gets all subnets in a virtual network.
 * x-ms-original-file: 2025-05-01/SubnetList.json
 */
async function listSubnets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.subnets.list("subnet-test", "vnetname")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSubnets();
}

main().catch(console.error);
