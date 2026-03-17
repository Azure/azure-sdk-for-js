// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of ASR replication protected clusters in the vault.
 *
 * @summary gets the list of ASR replication protected clusters in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionClusters_List.json
 */
async function getsTheListOfReplicationProtectionClustersInVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationProtectionClusters.list("resourceGroupPS1", "vault1", {
    filter:
      "SourceFabricName eq 'asr-a2a-default-eastus' and SourceFabricLocation eq 'East US' and InstanceType eq 'A2A'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfReplicationProtectionClustersInVault();
}

main().catch(console.error);
