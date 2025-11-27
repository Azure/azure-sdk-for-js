// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details of the specified Cache
 *
 * @summary get the details of the specified Cache
 * x-ms-original-file: 2025-09-01-preview/Caches_Get.json
 */
async function cachesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.caches.get("myRG", "account1", "pool1", "cache1");
  console.log(result);
}

async function main() {
  await cachesGet();
}

main().catch(console.error);
