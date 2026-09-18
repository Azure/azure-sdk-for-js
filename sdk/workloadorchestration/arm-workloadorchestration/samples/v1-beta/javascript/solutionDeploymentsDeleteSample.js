// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a SolutionDeployment Resource
 *
 * @summary delete a SolutionDeployment Resource
 * x-ms-original-file: 2026-05-01-preview/SolutionDeployments_Delete_MaximumSet_Gen.json
 */
async function solutionDeploymentsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "45FB0C97-8A30-4DA8-81E4-5DFCBED80DBA";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutionDeployments.delete("rgconfigurationmanager", "abcdef");
}

async function main() {
  await solutionDeploymentsDeleteMaximumSet();
}

main().catch(console.error);
