// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to deletes an existing cache Node
 *
 * @summary deletes an existing cache Node
 * x-ms-original-file: 2023-05-01-preview/CacheNodesOperations_Delete_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function cacheNodesOperationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  await client.cacheNodesOperations.delete(
    "rgConnectedCache",
    "otvtvhmovthjwzjzbsqkbnmpcmmeianpqxmmaspvdczmrenquxigrtuarmlcmvsnaclhcbw",
  );
}

async function main(): Promise<void> {
  await cacheNodesOperationsDelete();
}

main().catch(console.error);
