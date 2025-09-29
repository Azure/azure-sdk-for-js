// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Removes a Storage Target from a cache. This operation is allowed at any time, but if the cache is down or unhealthy, the actual removal of the Storage Target may be delayed until the cache is healthy again. Note that if the cache has data to flush to the Storage Target, the data will be flushed before the Storage Target will be deleted.
 *
 * @summary Removes a Storage Target from a cache. This operation is allowed at any time, but if the cache is down or unhealthy, the actual removal of the Storage Target may be delayed until the cache is healthy again. Note that if the cache has data to flush to the Storage Target, the data will be flushed before the Storage Target will be deleted.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/StorageTargets_Delete.json
 */
async function storageTargetsDelete() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const cacheName = "sc1";
  const storageTargetName = "st1";
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.storageTargets.beginDeleteAndWait(
    resourceGroupName,
    cacheName,
    storageTargetName,
  );
  console.log(result);
}

async function main() {
  await storageTargetsDelete();
}

main().catch(console.error);
