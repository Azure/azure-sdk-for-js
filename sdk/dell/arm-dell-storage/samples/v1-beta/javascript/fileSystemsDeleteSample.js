// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageClient } = require("@azure/arm-dell-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a FileSystemResource
 *
 * @summary delete a FileSystemResource
 * x-ms-original-file: 2025-03-21-preview/FileSystems_Delete_MaximumSet_Gen.json
 */
async function fileSystemsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4B6E265D-57CF-4A9D-8B35-3CC68ED9D208";
  const client = new StorageClient(credential, subscriptionId);
  await client.fileSystems.delete("rgDell", "abcd");
}

/**
 * This sample demonstrates how to delete a FileSystemResource
 *
 * @summary delete a FileSystemResource
 * x-ms-original-file: 2025-03-21-preview/FileSystems_Delete_MinimumSet_Gen.json
 */
async function fileSystemsDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BF7E7352-2FE4-4163-9CF7-5FF8EC2E9B92";
  const client = new StorageClient(credential, subscriptionId);
  await client.fileSystems.delete("rgDell", "abcd");
}

async function main() {
  await fileSystemsDeleteMaximumSetGen();
  await fileSystemsDeleteMinimumSetGen();
}

main().catch(console.error);
