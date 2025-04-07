// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts an UpdateRun.
 *
 * @summary starts an UpdateRun.
 * x-ms-original-file: 2025-03-01/UpdateRuns_Start.json
 */
async function startsAnUpdateRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.start("rg1", "fleet1", "run1");
  console.log(result);
}

/**
 * This sample demonstrates how to starts an UpdateRun.
 *
 * @summary starts an UpdateRun.
 * x-ms-original-file: 2025-03-01/UpdateRuns_Start_MaximumSet_Gen.json
 */
async function startsAnUpdateRunGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.start("rgfleets", "fleet1", "fleet1", {
    ifMatch: "bvhjlqeindkmljbbiypbqiaqgtkhlu",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await startsAnUpdateRun();
  await startsAnUpdateRunGeneratedByMaximumSetRule();
}

main().catch(console.error);
