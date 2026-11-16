// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified Blob Access Point configuration.
 *
 * @summary get the specified Blob Access Point configuration.
 * x-ms-original-file: 2026-09-01/BlobAccessPointConfigurations_Get.json
 */
async function getBlobAccessPointConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobAccessPointConfigurations.get(
    "testrg",
    "teststorageaccount",
    "testaccesspointconfig",
  );
  console.log(result);
}

async function main() {
  await getBlobAccessPointConfiguration();
}

main().catch(console.error);
