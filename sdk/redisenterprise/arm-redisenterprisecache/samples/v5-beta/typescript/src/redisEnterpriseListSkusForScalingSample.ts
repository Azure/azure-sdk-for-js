// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the available SKUs for scaling the Redis Enterprise cluster.
 *
 * @summary lists the available SKUs for scaling the Redis Enterprise cluster.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseListSkusForScaling.json
 */
async function redisEnterpriseListSkusForScaling(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.redisEnterprise.listSkusForScaling("rg1", "cache1");
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseListSkusForScaling();
}

main().catch(console.error);
