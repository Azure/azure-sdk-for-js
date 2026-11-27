// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post request to deploy
 *
 * @summary post request to deploy
 * x-ms-original-file: 2026-05-01-preview/Targets_InstallSolution_MaximumSet_Gen.json
 */
async function targetsInstallSolutionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.targets.installSolution("rgconfigurationmanager", "testname", {
    solutionVersionId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target/Solutions/solution/Versions/solution-1.0.0.1",
  });
}

async function main() {
  await targetsInstallSolutionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
