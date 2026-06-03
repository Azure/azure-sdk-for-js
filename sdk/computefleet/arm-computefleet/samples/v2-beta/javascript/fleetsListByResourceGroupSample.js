// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureFleetClient } = require("@azure/arm-computefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Fleet resources by resource group
 *
 * @summary list Fleet resources by resource group
 * x-ms-original-file: 2026-04-01-preview/Fleets_ListByResourceGroup_MaximumSet_Gen.json
 */
async function fleetsListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listByResourceGroup("rgazurefleet")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await fleetsListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
