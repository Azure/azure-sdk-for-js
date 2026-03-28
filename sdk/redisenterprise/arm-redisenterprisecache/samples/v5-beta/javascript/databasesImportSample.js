// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to imports database files to target database.
 *
 * @summary imports database files to target database.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesImport.json
 */
async function redisEnterpriseDatabasesImport() {
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

async function main() {
  await redisEnterpriseDatabasesImport();
}

main().catch(console.error);
