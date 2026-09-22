// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the existing immutability policy along with the corresponding ETag in response headers and body.
 *
 * @summary gets the existing immutability policy along with the corresponding ETag in response headers and body.
 * x-ms-original-file: 2026-04-01/BlobContainersGetImmutabilityPolicy.json
 */
async function getImmutabilityPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.getImmutabilityPolicy(
    "res5221",
    "sto9177",
    "container3489",
  );
  console.log(result);
}

async function main() {
  await getImmutabilityPolicy();
}

main().catch(console.error);
