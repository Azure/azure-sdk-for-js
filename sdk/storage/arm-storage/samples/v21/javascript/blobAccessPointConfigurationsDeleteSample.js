// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Blob Access Point configuration.
 *
 * @summary delete a Blob Access Point configuration.
 * x-ms-original-file: 2026-09-01/BlobAccessPointConfigurations_Delete.json
 */
async function deleteBlobAccessPointConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.blobAccessPointConfigurations.delete(
    "testrg",
    "teststorageaccount",
    "testaccesspointconfig",
  );
}

async function main() {
  await deleteBlobAccessPointConfiguration();
}

main().catch(console.error);
