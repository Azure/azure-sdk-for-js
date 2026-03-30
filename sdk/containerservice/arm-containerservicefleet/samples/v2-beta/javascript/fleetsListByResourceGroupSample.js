// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists fleets in the specified subscription and resource group.
 *
 * @summary lists fleets in the specified subscription and resource group.
 * x-ms-original-file: 2026-02-01-preview/Fleets_ListByResourceGroup.json
 */
async function listsTheFleetResourcesInAResourceGroup() {
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
}

main().catch(console.error);
