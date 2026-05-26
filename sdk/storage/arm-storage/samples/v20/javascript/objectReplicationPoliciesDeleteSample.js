// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the object replication policy associated with the specified storage account.
 *
 * @summary deletes the object replication policy associated with the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountDeleteObjectReplicationPolicy.json
 */
async function storageAccountDeleteObjectReplicationPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.objectReplicationPolicies.delete(
    "res6977",
    "sto2527",
    "{objectReplicationPolicy-Id}",
  );
}

async function main() {
  await storageAccountDeleteObjectReplicationPolicies();
}

main().catch(console.error);
