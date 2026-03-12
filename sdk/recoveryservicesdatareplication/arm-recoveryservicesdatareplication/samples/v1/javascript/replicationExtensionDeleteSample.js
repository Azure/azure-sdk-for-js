// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the replication extension in the given vault.
 *
 * @summary deletes the replication extension in the given vault.
 * x-ms-original-file: 2024-09-01/ReplicationExtension_Delete.json
 */
async function deletesTheReplicationExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.replicationExtension.delete("rgrecoveryservicesdatareplication", "4", "g16yjJ");
}

async function main() {
  await deletesTheReplicationExtension();
}

main().catch(console.error);
