// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates the Redis Enterprise database's access keys.
 *
 * @summary Regenerates the Redis Enterprise database's access keys.
 * x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/preview/2025-05-01-preview/examples/RedisEnterpriseDatabasesRegenerateKey.json
 */

import {
  RegenerateKeyParameters,
  RedisEnterpriseManagementClient,
} from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisEnterpriseDatabasesRegenerateKey(): Promise<void> {
  const subscriptionId =
    process.env["REDISENTERPRISE_SUBSCRIPTION_ID"] ||
    "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const resourceGroupName =
    process.env["REDISENTERPRISE_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cache1";
  const databaseName = "default";
  const parameters: RegenerateKeyParameters = { keyType: "Primary" };
  const credential = new DefaultAzureCredential();
  const client = new RedisEnterpriseManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.databases.beginRegenerateKeyAndWait(
    resourceGroupName,
    clusterName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesRegenerateKey();
}

main().catch(console.error);
