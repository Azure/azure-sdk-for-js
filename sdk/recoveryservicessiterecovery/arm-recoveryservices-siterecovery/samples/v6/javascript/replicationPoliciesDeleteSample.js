// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a replication policy.
 *
 * @summary the operation to delete a replication policy.
 * x-ms-original-file: 2025-08-01/ReplicationPolicies_Delete.json
 */
async function deleteThePolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationPolicies.delete("resourceGroupPS1", "vault1", "protectionprofile1");
}

async function main() {
  await deleteThePolicy();
}

main().catch(console.error);
