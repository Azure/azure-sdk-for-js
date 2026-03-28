// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to exports a database file from target database.
 *
 * @summary exports a database file from target database.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesExport.json
 */
async function redisEnterpriseDatabasesExport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.databases.export("rg1", "cache1", "default", {
    sasUri: "https://contosostorage.blob.core.window.net/urlToBlobContainer?sasKeyParameters",
  });
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesExport();
}

main().catch(console.error);
