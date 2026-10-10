// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post request to unstage solution version
 *
 * @summary post request to unstage solution version
 * x-ms-original-file: 2026-05-01-preview/Targets_UnstageSolutionVersion_MaximumSet_Gen.json
 */
async function targetsUnstageSolutionVersionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.unstageSolutionVersion("rgconfigurationmanager", "testname", {
    solutionVersionId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target/Solutions/solution/Versions/solution-1.0.0.1",
  });
  console.log(result);
}

async function main() {
  await targetsUnstageSolutionVersionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
