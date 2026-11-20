// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a SolutionDeployment Resource
 *
 * @summary get a SolutionDeployment Resource
 * x-ms-original-file: 2026-05-01-preview/SolutionDeployments_Get_MaximumSet_Gen.json
 */
async function solutionDeploymentsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "45FB0C97-8A30-4DA8-81E4-5DFCBED80DBA";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionDeployments.get(
    "rgconfigurationmanager",
    "nhlqmzheqzagkdztldtqj",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionDeploymentsGetMaximumSet();
}

main().catch(console.error);
