// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts an UpdateRun.
 *
 * @summary starts an UpdateRun.
 * x-ms-original-file: 2026-02-01-preview/UpdateRuns_Start.json
 */
async function startsAnUpdateRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.start("rg1", "fleet1", "run1");
  console.log(result);
}

async function main(): Promise<void> {
  await startsAnUpdateRun();
}

main().catch(console.error);
