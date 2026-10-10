// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Solution resource
 *
 * @summary get a Solution resource
 * x-ms-original-file: 2026-05-01-preview/SolutionMetadataVersions_Get_MaximumSet_Gen.json
 */
async function solutionMetadataVersionsGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.solutionMetadataVersions.get(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "metadataSampleName",
    "1.0.0",
  );
  console.log(result);
}

async function main() {
  await solutionMetadataVersionsGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
