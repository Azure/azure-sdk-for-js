// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of ASR replication protection intent objects in the vault.
 *
 * @summary gets the list of ASR replication protection intent objects in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionIntents_List.json
 */
async function getsTheListOfReplicationProtectionIntentObjects(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "509099b2-9d2c-4636-b43e-bd5cafb6be69";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationProtectionIntents.list(
    "resourceGroupPS1",
    "2007vttp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfReplicationProtectionIntentObjects();
}

main().catch(console.error);
