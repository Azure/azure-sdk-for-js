// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified External Cluster
 *
 * @summary delete the specified External Cluster
 * x-ms-original-file: 2026-08-15-preview/ExternalClusters_Delete.json
 */
async function externalClustersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.externalClusters.delete("contosoNetAppRg", "contoso-external-cluster");
}

async function main(): Promise<void> {
  await externalClustersDelete();
}

main().catch(console.error);
