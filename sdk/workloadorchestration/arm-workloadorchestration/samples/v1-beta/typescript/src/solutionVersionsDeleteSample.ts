// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Solution Version Resource
 *
 * @summary delete a Solution Version Resource
 * x-ms-original-file: 2026-05-01-preview/SolutionVersions_Delete_MaximumSet_Gen.json
 */
async function solutionVersionsDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutionVersions.delete(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
  );
}

async function main(): Promise<void> {
  await solutionVersionsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
