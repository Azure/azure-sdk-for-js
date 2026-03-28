// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all of the available subnet delegations for this resource group in this region.
 *
 * @summary gets all of the available subnet delegations for this resource group in this region.
 * x-ms-original-file: 2025-05-01/AvailableDelegationsResourceGroupGet.json
 */
async function getAvailableDelegationsInTheResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableResourceGroupDelegations.list("rg1", "westcentralus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAvailableDelegationsInTheResourceGroup();
}

main().catch(console.error);
