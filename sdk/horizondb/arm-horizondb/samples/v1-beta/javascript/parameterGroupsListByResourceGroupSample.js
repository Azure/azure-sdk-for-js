// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all HorizonDB parameter groups in a resource group.
 *
 * @summary lists all HorizonDB parameter groups in a resource group.
 * x-ms-original-file: 2026-10-01-preview/ParameterGroups_ListByResourceGroup.json
 */
async function listHorizonDBParameterGroupsInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.parameterGroups.listByResourceGroup("example-resource-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDBParameterGroupsInAResourceGroup();
}

main().catch(console.error);
