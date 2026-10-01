// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureRedHatOpenShiftClient } from "@azure/arm-redhatopenshift";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation returns the admin kubeconfig.
 *
 * @summary the operation returns the admin kubeconfig.
 * x-ms-original-file: 2025-07-25/OpenShiftClusters_ListAdminCredentials.json
 */
async function listsAdminKubeconfigOfAnOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.openShiftClusters.listAdminCredentials(
    "resourceGroup",
    "resourceName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listsAdminKubeconfigOfAnOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName();
}

main().catch(console.error);
