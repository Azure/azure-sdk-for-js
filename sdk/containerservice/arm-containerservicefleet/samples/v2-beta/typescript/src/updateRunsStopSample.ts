// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops an UpdateRun.
 *
 * @summary stops an UpdateRun.
 * x-ms-original-file: 2026-02-01-preview/UpdateRuns_Stop.json
 */
async function stopsAnUpdateRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.stop("rg1", "fleet1", "run1");
  console.log(result);
}

async function main(): Promise<void> {
  await stopsAnUpdateRun();
}

main().catch(console.error);
