// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a replication policy.
 *
 * @summary the operation to update a replication policy.
 * x-ms-original-file: 2025-08-01/ReplicationPolicies_Update.json
 */
async function updatesThePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationPolicies.update(
    "resourceGroupPS1",
    "vault1",
    "protectionprofile1",
    { properties: { replicationProviderSettings: { instanceType: "HyperVReplicaAzure" } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesThePolicy();
}

main().catch(console.error);
