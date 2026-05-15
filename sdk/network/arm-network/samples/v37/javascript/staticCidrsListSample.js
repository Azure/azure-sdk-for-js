// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets list of Static CIDR resources at Network Manager level.
 *
 * @summary gets list of Static CIDR resources at Network Manager level.
 * x-ms-original-file: 2025-05-01/StaticCidrs_List.json
 */
async function staticCidrsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticCidrs.list("rg1", "TestNetworkManager", "TestPool")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await staticCidrsList();
}

main().catch(console.error);
