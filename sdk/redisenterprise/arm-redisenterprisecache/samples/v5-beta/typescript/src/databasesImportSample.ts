// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to imports database files to target database.
 *
 * @summary imports database files to target database.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesImport.json
 */
async function redisEnterpriseDatabasesImport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.databases.import("rg1", "cache1", "default", {
    sasUris: [
      "https://contosostorage.blob.core.window.net/urltoBlobFile1?sasKeyParameters",
      "https://contosostorage.blob.core.window.net/urltoBlobFile2?sasKeyParameters",
    ],
  });
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesImport();
}

main().catch(console.error);
