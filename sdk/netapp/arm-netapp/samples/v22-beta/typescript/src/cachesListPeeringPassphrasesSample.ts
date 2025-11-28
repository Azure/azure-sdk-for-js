// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation will list the cluster peering command, cluster peering passphrase and the vserver peering command
 *
 * @summary this operation will list the cluster peering command, cluster peering passphrase and the vserver peering command
 * x-ms-original-file: 2025-09-01-preview/Caches_ListPeeringPassphrases.json
 */
async function cachesListPeeringPassphrases(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.caches.listPeeringPassphrases("myRG", "account1", "pool1", "cache-1");
  console.log(result);
}

async function main(): Promise<void> {
  await cachesListPeeringPassphrases();
}

main().catch(console.error);
