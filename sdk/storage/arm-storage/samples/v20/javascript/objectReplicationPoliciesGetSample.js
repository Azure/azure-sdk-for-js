// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the object replication policy of the storage account by policy ID.
 *
 * @summary get the object replication policy of the storage account by policy ID.
 * x-ms-original-file: 2025-08-01/StorageAccountGetObjectReplicationPolicy.json
 */
async function storageAccountGetObjectReplicationPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.objectReplicationPolicies.get(
    "res6977",
    "sto2527",
    "{objectReplicationPolicy-Id}",
  );
  console.log(result);
}

async function main() {
  await storageAccountGetObjectReplicationPolicies();
}

main().catch(console.error);
