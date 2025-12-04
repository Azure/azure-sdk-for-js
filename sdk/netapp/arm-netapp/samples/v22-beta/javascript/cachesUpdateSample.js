// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the specified Cache
 *
 * @summary patch the specified Cache
 * x-ms-original-file: 2025-09-01-preview/Caches_Update.json
 */
async function cachesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.caches.update("myRG", "account1", "pool1", "cache1", {
    properties: { size: 214748364800 },
  });
}

async function main() {
  await cachesUpdate();
}

main().catch(console.error);
