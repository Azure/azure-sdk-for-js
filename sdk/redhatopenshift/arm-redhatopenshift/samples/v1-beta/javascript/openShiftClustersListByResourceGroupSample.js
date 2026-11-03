// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureRedHatOpenShiftClient } = require("@azure/arm-redhatopenshift");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation returns properties of each OpenShift cluster.
 *
 * @summary the operation returns properties of each OpenShift cluster.
 * x-ms-original-file: 2025-07-25/OpenShiftClusters_ListByResourceGroup.json
 */
async function listsOpenShiftClustersInTheSpecifiedSubscriptionAndResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.openShiftClusters.listByResourceGroup("resourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsOpenShiftClustersInTheSpecifiedSubscriptionAndResourceGroup();
}

main().catch(console.error);
