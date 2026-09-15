// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Context Resource
 *
 * @summary delete Context Resource
 * x-ms-original-file: 2026-05-01-preview/Contexts_Delete_MaximumSet_Gen.json
 */
async function contextsDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.contexts.delete("rgconfigurationmanager", "testname");
}

async function main(): Promise<void> {
  await contextsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
