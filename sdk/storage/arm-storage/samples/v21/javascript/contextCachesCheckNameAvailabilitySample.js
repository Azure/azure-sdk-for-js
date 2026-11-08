// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the availability of a context cache resource name.
 *
 * @summary check the availability of a context cache resource name.
 * x-ms-original-file: 2026-09-01/StorageContextCacheCRUD/ContextCaches_CheckNameAvailability.json
 */
async function contextCacheCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.contextCaches.checkNameAvailability({
    name: "testcontextcache",
    type: "Microsoft.Storage/contextCaches",
  });
  console.log(result);
}

async function main() {
  await contextCacheCheckNameAvailability();
}

main().catch(console.error);
