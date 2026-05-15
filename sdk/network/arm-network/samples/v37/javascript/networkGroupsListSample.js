// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the specified network group.
 *
 * @summary lists the specified network group.
 * x-ms-original-file: 2025-05-01/NetworkManagerGroupList.json
 */
async function networkGroupsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkGroups.list("rg1", "testNetworkManager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkGroupsList();
}

main().catch(console.error);
