// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch the specified Cache
 *
 * @summary patch the specified Cache
 * x-ms-original-file: 2025-09-01-preview/Caches_Update.json
 */
async function cachesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.caches.update("myRG", "account1", "pool1", "cache1", {
    properties: { size: 214748364800 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cachesUpdate();
}

main().catch(console.error);
