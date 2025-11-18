// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a disk encryption set.
 *
 * @summary deletes a disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Delete.json
 */
async function deleteADiskEncryptionSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskEncryptionSets.delete("myResourceGroup", "myDiskEncryptionSet");
}

async function main() {
  await deleteADiskEncryptionSet();
}

main().catch(console.error);
