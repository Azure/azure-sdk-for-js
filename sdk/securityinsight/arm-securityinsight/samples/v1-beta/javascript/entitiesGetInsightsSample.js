// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to execute Insights for an entity.
 *
 * @summary execute Insights for an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/insights/PostGetInsights.json
 */
async function entityInsight() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.getInsights(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
    {
      addDefaultExtendedTimeRange: false,
      endTime: new Date("2021-10-01T00:00:00.000Z"),
      insightQueryIds: ["cae8d0aa-aa45-4d53-8d88-17dd64ffd4e4"],
      startTime: new Date("2021-09-01T00:00:00.000Z"),
    },
  );
  console.log(result);
}

async function main() {
  await entityInsight();
}

main().catch(console.error);
