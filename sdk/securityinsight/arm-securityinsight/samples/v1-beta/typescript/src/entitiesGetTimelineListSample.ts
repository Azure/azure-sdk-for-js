// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to timeline for an entity.
 *
 * @summary timeline for an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/timeline/PostTimelineEntity.json
 */
async function entityTimeline(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entitiesGetTimeline.list(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
    {
      endTime: new Date("2021-10-01T00:00:00.000Z"),
      numberOfBucket: 4,
      startTime: new Date("2021-09-01T00:00:00.000Z"),
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await entityTimeline();
}

main().catch(console.error);
