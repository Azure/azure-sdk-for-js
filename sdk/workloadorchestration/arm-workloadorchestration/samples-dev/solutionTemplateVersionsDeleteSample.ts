// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Solution Template Version Resource
 *
 * @summary delete a Solution Template Version Resource
 * x-ms-original-file: 2026-05-01-preview/SolutionTemplateVersions_Delete_MaximumSet_Gen.json
 */
async function solutionTemplateVersionsDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutionTemplateVersions.delete("rgconfigurationmanager", "testname", "1.0.0");
}

async function main(): Promise<void> {
  await solutionTemplateVersionsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
