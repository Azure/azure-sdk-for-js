// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a UpdateRun
 *
 * @summary delete a UpdateRun
 * x-ms-original-file: 2025-04-01-preview/UpdateRuns_Delete.json
 */

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteAnUpdateRunResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.updateRuns.delete("rg1", "fleet1", "run1");
}

/**
 * This sample demonstrates how to delete a UpdateRun
 *
 * @summary delete a UpdateRun
 * x-ms-original-file: 2025-04-01-preview/UpdateRuns_Delete_MaximumSet_Gen.json
 */
async function deleteAnUpdateRunResourceGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.updateRuns.delete("rgfleets", "fleet1", "fleet1", {
    ifMatch: "xnbwucfeufeagpa",
  });
}

async function main(): Promise<void> {
  await deleteAnUpdateRunResource();
  await deleteAnUpdateRunResourceGeneratedByMaximumSetRule();
}

main().catch(console.error);
