// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the available SKUs for scaling the Redis Enterprise cluster.
 *
 * @summary Lists the available SKUs for scaling the Redis Enterprise cluster.
 * x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/preview/2025-05-01-preview/examples/RedisEnterpriseListSkusForScaling.json
 */
async function redisEnterpriseListSkusForScaling(): Promise<void> {
  const subscriptionId =
    process.env["REDISENTERPRISE_SUBSCRIPTION_ID"] ||
    "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const resourceGroupName =
    process.env["REDISENTERPRISE_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cache1";
  const credential = new DefaultAzureCredential();
  const client = new RedisEnterpriseManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.redisEnterprise.listSkusForScaling(
    resourceGroupName,
    clusterName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseListSkusForScaling();
}

main().catch(console.error);
