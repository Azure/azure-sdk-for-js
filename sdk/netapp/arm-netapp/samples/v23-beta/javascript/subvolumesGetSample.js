// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the path associated with the subvolumeName provided
 *
 * @summary returns the path associated with the subvolumeName provided
 * x-ms-original-file: 2025-09-01-preview/Subvolumes_Get.json
 */
async function subvolumesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.subvolumes.get("myRG", "account1", "pool1", "volume1", "subvolume1");
  console.log(result);
}

async function main() {
  await subvolumesGet();
}

main().catch(console.error);
