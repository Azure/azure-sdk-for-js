// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Solution resource
 *
 * @summary get a Solution resource
 * x-ms-original-file: 2026-05-01-preview/SolutionMetadatas_Get_MaximumSet_Gen.json
 */
async function solutionMetadatasGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.solutionMetadatas.get(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "metadataSampleName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionMetadatasGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
