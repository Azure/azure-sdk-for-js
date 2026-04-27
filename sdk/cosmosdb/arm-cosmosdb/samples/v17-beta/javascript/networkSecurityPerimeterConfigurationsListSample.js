// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets list of effective Network Security Perimeter Configuration for cosmos db account
 *
 * @summary gets list of effective Network Security Perimeter Configuration for cosmos db account
 * x-ms-original-file: 2025-11-01-preview/NetworkSecurityPerimeterConfigurationList.json
 */
async function namspaceNetworkSecurityPerimeterConfigurationList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.list(
    "res4410",
    "cosmosTest",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await namspaceNetworkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
