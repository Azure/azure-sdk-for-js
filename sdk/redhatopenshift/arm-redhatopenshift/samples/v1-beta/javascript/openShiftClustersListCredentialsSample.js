// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureRedHatOpenShiftClient } = require("@azure/arm-redhatopenshift");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation returns the credentials.
 *
 * @summary the operation returns the credentials.
 * x-ms-original-file: 2025-07-25/OpenShiftClusters_ListCredentials.json
 */
async function listsCredentialsOfAnOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.openShiftClusters.listCredentials("resourceGroup", "resourceName");
  console.log(result);
}

async function main() {
  await listsCredentialsOfAnOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName();
}

main().catch(console.error);
