// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create a replication policy.
 *
 * @summary the operation to create a replication policy.
 * x-ms-original-file: 2025-08-01/ReplicationPolicies_Create.json
 */
async function createsThePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationPolicies.create(
    "resourceGroupPS1",
    "vault1",
    "protectionprofile1",
    { properties: { providerSpecificInput: { instanceType: "HyperVReplicaAzure" } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsThePolicy();
}

main().catch(console.error);
