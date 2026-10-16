// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Target Resource
 *
 * @summary delete a Target Resource
 * x-ms-original-file: 2026-05-01-preview/Targets_Delete_MaximumSet_Gen.json
 */
async function targetsDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.targets.delete("rgconfigurationmanager", "testname", { forceDelete: true });
}

async function main(): Promise<void> {
  await targetsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
