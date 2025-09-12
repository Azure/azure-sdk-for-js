// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all patch schedules in the specified redis cache (there is only one).
 *
 * @summary gets all patch schedules in the specified redis cache (there is only one).
 * x-ms-original-file: 2024-11-01/RedisCachePatchSchedulesList.json
 */
async function redisCachePatchSchedulesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.patchSchedules.listByRedisResource("rg1", "cache1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await redisCachePatchSchedulesList();
}

main().catch(console.error);
