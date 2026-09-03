// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureRedHatOpenShiftClient } = require("@azure/arm-redhatopenshift");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation returns properties of each OpenShift cluster.
 *
 * @summary the operation returns properties of each OpenShift cluster.
 * x-ms-original-file: 2025-07-25/OpenShiftClusters_List.json
 */
async function listsOpenShiftClustersInTheSpecifiedSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.openShiftClusters.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsOpenShiftClustersInTheSpecifiedSubscription();
}

main().catch(console.error);
