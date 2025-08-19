// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Exports a database file from target database.
 *
 * @summary Exports a database file from target database.
 * x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/preview/2025-05-01-preview/examples/RedisEnterpriseDatabasesExport.json
 */

import {
  ExportClusterParameters,
  RedisEnterpriseManagementClient,
} from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisEnterpriseDatabasesExport(): Promise<void> {
  const subscriptionId =
    process.env["REDISENTERPRISE_SUBSCRIPTION_ID"] ||
    "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const resourceGroupName =
    process.env["REDISENTERPRISE_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cache1";
  const databaseName = "default";
  const parameters: ExportClusterParameters = {
    sasUri:
      "https://contosostorage.blob.core.window.net/urlToBlobContainer?sasKeyParameters",
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisEnterpriseManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.databases.beginExportAndWait(
    resourceGroupName,
    clusterName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesExport();
}

main().catch(console.error);
