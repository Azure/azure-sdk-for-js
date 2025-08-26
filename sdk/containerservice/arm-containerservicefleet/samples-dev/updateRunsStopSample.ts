// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to stops an UpdateRun.
 *
 * @summary stops an UpdateRun.
 * x-ms-original-file: 2025-04-01-preview/UpdateRuns_Stop.json
 */

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

async function stopsAnUpdateRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.stop("rg1", "fleet1", "run1");
  console.log(result);
}

/**
 * This sample demonstrates how to stops an UpdateRun.
 *
 * @summary stops an UpdateRun.
 * x-ms-original-file: 2025-04-01-preview/UpdateRuns_Stop_MaximumSet_Gen.json
 */
async function stopsAnUpdateRunGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.stop("rgfleets", "fleet1", "fleet1", {
    ifMatch: "jb",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await stopsAnUpdateRun();
  await stopsAnUpdateRunGeneratedByMaximumSetRule();
}

main().catch(console.error);
