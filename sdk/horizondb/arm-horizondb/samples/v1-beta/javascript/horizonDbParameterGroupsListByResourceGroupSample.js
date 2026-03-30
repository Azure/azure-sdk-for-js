// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all HorizonDb parameter groups in a resource group.
 *
 * @summary lists all HorizonDb parameter groups in a resource group.
 * x-ms-original-file: 2026-01-20-preview/ParameterGroups_ListByResourceGroup.json
 */
async function listHorizonDbParameterGroupsInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbParameterGroups.listByResourceGroup(
    "exampleresourcegroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDbParameterGroupsInAResourceGroup();
}

main().catch(console.error);
