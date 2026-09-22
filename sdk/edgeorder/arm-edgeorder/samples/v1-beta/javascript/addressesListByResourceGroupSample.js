// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeOrderClient } = require("@azure/arm-edgeorder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the addresses available under the given resource group.
 *
 * @summary list all the addresses available under the given resource group.
 * x-ms-original-file: 2024-02-01/ListAddressesAtResourceGroupLevel.json
 */
async function listAddressesAtResourceGroupLevel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.addresses.listByResourceGroup("YourResourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAddressesAtResourceGroupLevel();
}

main().catch(console.error);
