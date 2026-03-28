// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets list of effective Network Security Perimeter Configuration for cosmos db account
 *
 * @summary gets list of effective Network Security Perimeter Configuration for cosmos db account
 * x-ms-original-file: 2025-11-01-preview/NetworkSecurityPerimeterConfigurationList.json
 */
async function namspaceNetworkSecurityPerimeterConfigurationList(): Promise<void> {
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

async function main(): Promise<void> {
  await namspaceNetworkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
