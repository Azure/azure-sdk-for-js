// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureRedHatOpenShiftClient } = require("@azure/arm-redhatopenshift");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation returns the admin kubeconfig.
 *
 * @summary the operation returns the admin kubeconfig.
 * x-ms-original-file: 2025-07-25/OpenShiftClusters_ListAdminCredentials.json
 */
async function listsAdminKubeconfigOfAnOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.openShiftClusters.listAdminCredentials(
    "resourceGroup",
    "resourceName",
  );
  console.log(result);
}

async function main() {
  await listsAdminKubeconfigOfAnOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName();
}

main().catch(console.error);
