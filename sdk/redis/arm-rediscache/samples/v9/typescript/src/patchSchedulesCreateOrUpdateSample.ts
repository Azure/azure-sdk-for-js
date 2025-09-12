// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or replace the patching schedule for Redis cache.
 *
 * @summary create or replace the patching schedule for Redis cache.
 * x-ms-original-file: 2024-11-01/RedisCachePatchSchedulesCreateOrUpdate.json
 */
async function redisCachePatchSchedulesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.patchSchedules.createOrUpdate("rg1", "cache1", "default", {
    properties: {
      scheduleEntries: [
        { dayOfWeek: "Monday", maintenanceWindow: "PT5H", startHourUtc: 12 },
        { dayOfWeek: "Tuesday", startHourUtc: 12 },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisCachePatchSchedulesCreateOrUpdate();
}

main().catch(console.error);
