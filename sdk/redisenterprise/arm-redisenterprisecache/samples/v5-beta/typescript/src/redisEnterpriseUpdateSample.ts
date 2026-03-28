// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing Redis Enterprise cluster
 *
 * @summary updates an existing Redis Enterprise cluster
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseUpdate.json
 */
async function redisEnterpriseUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.redisEnterprise.update("rg1", "cache1", {
    minimumTlsVersion: "1.2",
    publicNetworkAccess: "Enabled",
    maintenanceConfiguration: {
      maintenanceWindows: [
        { type: "Weekly", duration: "PT6H", startHourUtc: 3, schedule: { dayOfWeek: "Monday" } },
        { type: "Weekly", duration: "PT6H", startHourUtc: 3, schedule: { dayOfWeek: "Tuesday" } },
        { type: "Weekly", duration: "PT6H", startHourUtc: 3, schedule: { dayOfWeek: "Wednesday" } },
      ],
    },
    sku: { name: "EnterpriseFlash_F300", capacity: 9 },
    tags: { tag1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseUpdate();
}

main().catch(console.error);
