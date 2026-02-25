// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all volumes within the capacity pool
 *
 * @summary list all volumes within the capacity pool
 * x-ms-original-file: 2025-09-01-preview/Volumes_ExtraLargeVolumes_List.json
 */
async function volumesExtralargeVolumeList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D633CC2E-722B-4AE1-B636-BBD9E4C60ED9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumes.list("myRG", "account1", "pool1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list all volumes within the capacity pool
 *
 * @summary list all volumes within the capacity pool
 * x-ms-original-file: 2025-09-01-preview/Volumes_List.json
 */
async function volumesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumes.list("myRG", "account1", "pool1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await volumesExtralargeVolumeList();
  await volumesList();
}

main().catch(console.error);
