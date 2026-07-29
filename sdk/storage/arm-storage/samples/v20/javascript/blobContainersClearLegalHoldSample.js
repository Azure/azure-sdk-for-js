// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to clears legal hold tags. Clearing the same or non-existent tag results in an idempotent operation. ClearLegalHold clears out only the specified tags in the request.
 *
 * @summary clears legal hold tags. Clearing the same or non-existent tag results in an idempotent operation. ClearLegalHold clears out only the specified tags in the request.
 * x-ms-original-file: 2026-04-01/BlobContainersClearLegalHold.json
 */
async function clearLegalHoldContainers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.clearLegalHold("res4303", "sto7280", "container8723", {
    tags: ["tag1", "tag2", "tag3"],
  });
  console.log(result);
}

async function main() {
  await clearLegalHoldContainers();
}

main().catch(console.error);
