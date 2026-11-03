// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureRedHatOpenShiftClient } from "@azure/arm-redhatopenshift";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation returns the credentials.
 *
 * @summary the operation returns the credentials.
 * x-ms-original-file: 2025-07-25/OpenShiftClusters_ListCredentials.json
 */
async function listsCredentialsOfAnOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.openShiftClusters.listCredentials("resourceGroup", "resourceName");
  console.log(result);
}

async function main(): Promise<void> {
  await listsCredentialsOfAnOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName();
}

main().catch(console.error);
