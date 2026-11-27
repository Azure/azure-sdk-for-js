// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post request to remove solution version revision
 *
 * @summary post request to remove solution version revision
 * x-ms-original-file: 2026-05-01-preview/Targets_RemoveRevision_MaximumSet_Gen.json
 */
async function targetsRemoveRevisionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.targets.removeRevision("rgconfigurationmanager", "testname", {
    solutionTemplateId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/SolutionTemplates/st",
    solutionVersion: "f",
  });
}

async function main() {
  await targetsRemoveRevisionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
