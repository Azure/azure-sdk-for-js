// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to lists fleets in the specified subscription and resource group.
 *
 * @summary lists fleets in the specified subscription and resource group.
 * x-ms-original-file: 2025-04-01-preview/Fleets_ListByResourceGroup.json
 */

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

async function listsTheFleetResourcesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists fleets in the specified subscription and resource group.
 *
 * @summary lists fleets in the specified subscription and resource group.
 * x-ms-original-file: 2025-04-01-preview/Fleets_ListByResourceGroup_MaximumSet_Gen.json
 */
async function listsTheFleetResourcesInAResourceGroupGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listByResourceGroup("rgfleets")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheFleetResourcesInAResourceGroup();
  await listsTheFleetResourcesInAResourceGroupGeneratedByMaximumSetRule();
}

main().catch(console.error);
