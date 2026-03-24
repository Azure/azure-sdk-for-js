// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Redis Enterprise clusters in the specified subscription.
 *
 * @summary lists all Redis Enterprise clusters in the specified subscription.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseList.json
 */
async function redisEnterpriseList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.redisEnterprise.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await redisEnterpriseList();
}

main().catch(console.error);
