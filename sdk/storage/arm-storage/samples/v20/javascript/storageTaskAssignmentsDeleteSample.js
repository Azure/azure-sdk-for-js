// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the storage task assignment sub-resource
 *
 * @summary delete the storage task assignment sub-resource
 * x-ms-original-file: 2025-08-01/storageTaskAssignmentsCrud/DeleteStorageTaskAssignment.json
 */
async function deleteStorageTaskAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageTaskAssignments.delete("res4228", "sto4445", "myassignment1");
}

async function main() {
  await deleteStorageTaskAssignment();
}

main().catch(console.error);
