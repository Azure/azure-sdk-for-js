// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post request to uninstall
 *
 * @summary post request to uninstall
 * x-ms-original-file: 2026-05-01-preview/Targets_UninstallSolution_MaximumSet_Gen.json
 */
async function targetsUninstallSolutionMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.targets.uninstallSolution("rgconfigurationmanager", "testname", {
    solutionTemplateId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/SolutionTemplates/st",
    solutionInstanceName: "yedwbsm",
  });
}

async function main(): Promise<void> {
  await targetsUninstallSolutionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
