// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all proximity placement groups in a resource group.
 *
 * @summary lists all proximity placement groups in a resource group.
 * x-ms-original-file: 2025-04-01/proximityPlacementGroupExamples/ProximityPlacementGroup_ListByResourceGroup.json
 */
async function listProximityPlacementGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.proximityPlacementGroups.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listProximityPlacementGroup();
}

main().catch(console.error);
