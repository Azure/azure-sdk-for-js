// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Solution resources
 *
 * @summary list Solution resources
 * x-ms-original-file: 2026-05-01-preview/SolutionMetadataVersions_ListByParent_MaximumSet_Gen.json
 */
async function solutionMetadataVersionsListByParentMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.solutionMetadataVersions.listByParent(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "metadataSampleName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await solutionMetadataVersionsListByParentMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
