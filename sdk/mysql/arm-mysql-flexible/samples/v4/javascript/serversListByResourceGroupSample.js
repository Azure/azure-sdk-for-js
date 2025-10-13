// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the servers in a given resource group.
 *
 * @summary list all the servers in a given resource group.
 * x-ms-original-file: 2024-12-30/ServersListByResourceGroup.json
 */
async function listServersInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.listByResourceGroup("TestGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listServersInAResourceGroup();
}

main().catch(console.error);
