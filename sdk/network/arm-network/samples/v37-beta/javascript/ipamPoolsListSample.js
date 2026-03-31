// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets list of Pool resources at Network Manager level.
 *
 * @summary gets list of Pool resources at Network Manager level.
 * x-ms-original-file: 2025-05-01/IpamPools_List.json
 */
async function ipamPoolsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ipamPools.list("rg1", "TestNetworkManager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await ipamPoolsList();
}

main().catch(console.error);
