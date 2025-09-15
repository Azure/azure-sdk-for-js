// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to deletes the replication extension in the given vault.
 *
 * @summary deletes the replication extension in the given vault.
 * x-ms-original-file: 2024-09-01/ReplicationExtension_Delete.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function deletesTheReplicationExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.replicationExtension.delete("rgrecoveryservicesdatareplication", "4", "g16yjJ");
}

async function main(): Promise<void> {
  await deletesTheReplicationExtension();
}

main().catch(console.error);
