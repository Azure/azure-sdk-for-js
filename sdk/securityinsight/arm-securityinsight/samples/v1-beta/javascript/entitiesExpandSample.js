// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to expands an entity.
 *
 * @summary expands an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/expand/PostExpandEntity.json
 */
async function expandAnEntity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.expand(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
    {
      endTime: new Date("2019-05-26T00:00:00.000Z"),
      expansionId: "a77992f3-25e9-4d01-99a4-5ff606cc410a",
      startTime: new Date("2019-04-25T00:00:00.000Z"),
    },
  );
  console.log(result);
}

async function main() {
  await expandAnEntity();
}

main().catch(console.error);
