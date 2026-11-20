// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove Solution Template Version Resource
 *
 * @summary remove Solution Template Version Resource
 * x-ms-original-file: 2026-05-01-preview/SolutionTemplates_RemoveVersion_MaximumSet_Gen.json
 */
async function solutionTemplatesRemoveVersionMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutionTemplates.removeVersion("rgconfigurationmanager", "testname", {
    version: "nipqereqmxeiv",
  });
}

async function main(): Promise<void> {
  await solutionTemplatesRemoveVersionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
