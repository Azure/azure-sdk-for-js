// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list reservations by resource group
 *
 * @summary list reservations by resource group
 * x-ms-original-file: 2026-01-01-preview/Reservations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function reservationsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reservations.listByResourceGroup("rgpurestorage")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await reservationsListByResourceGroup();
}

main().catch(console.error);
