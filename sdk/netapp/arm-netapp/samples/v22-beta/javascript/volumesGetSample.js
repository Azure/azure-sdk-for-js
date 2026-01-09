// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details of the specified volume
 *
 * @summary get the details of the specified volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_ExtraLargeVolumes_Get.json
 */
async function volumesExtralargeVolumeGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D633CC2E-722B-4AE1-B636-BBD9E4C60ED9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.get("myRG", "account1", "pool1", "volume1");
  console.log(result);
}

/**
 * This sample demonstrates how to get the details of the specified volume
 *
 * @summary get the details of the specified volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_Get.json
 */
async function volumesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.get("myRG", "account1", "pool1", "volume1");
  console.log(result);
}

async function main() {
  await volumesExtralargeVolumeGet();
  await volumesGet();
}

main().catch(console.error);
