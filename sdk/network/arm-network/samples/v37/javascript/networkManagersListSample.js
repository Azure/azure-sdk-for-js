// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list network managers in a resource group.
 *
 * @summary list network managers in a resource group.
 * x-ms-original-file: 2025-05-01/NetworkManagerList.json
 */
async function listNetworkManager() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkManagers.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNetworkManager();
}

main().catch(console.error);
