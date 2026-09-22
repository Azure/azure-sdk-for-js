// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureRedHatOpenShiftClient } = require("@azure/arm-redhatopenshift");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation returns nothing.
 *
 * @summary the operation returns nothing.
 * x-ms-original-file: 2025-07-25/OpenShiftClusters_Delete.json
 */
async function deletesAOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  await client.openShiftClusters.delete("resourceGroup", "resourceName");
}

async function main() {
  await deletesAOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName();
}

main().catch(console.error);
