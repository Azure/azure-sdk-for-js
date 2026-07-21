// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Insights and Activities for an entity.
 *
 * @summary get Insights and Activities for an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetQueries.json
 */
async function getEntityQuery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.entities.queries(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
    "Insight",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getEntityQuery();
}

main().catch(console.error);
