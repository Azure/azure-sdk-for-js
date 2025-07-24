// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete confluent cluster by id
 *
 * @summary delete confluent cluster by id
 * x-ms-original-file: 2024-07-01/Cluster_Delete.json
 */
async function clusterDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.cluster.delete("myResourceGroup", "myOrganization", "env-12132", "dlz-f3a90de");
}

async function main(): Promise<void> {
  await clusterDelete();
}

main().catch(console.error);
