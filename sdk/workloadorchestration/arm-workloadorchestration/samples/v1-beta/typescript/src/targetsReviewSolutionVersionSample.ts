// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post request to review configuration
 *
 * @summary post request to review configuration
 * x-ms-original-file: 2026-05-01-preview/Targets_ReviewSolutionVersion_MaximumSet_Gen.json
 */
async function targetsReviewSolutionVersionMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.reviewSolutionVersion("rgconfigurationmanager", "testname", {
    solutionTemplateVersionId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/SolutionTemplates/st/versions/1.0.0",
    solutionInstanceName: "testname",
    solutionDependencies: [
      {
        solutionVersionId: "bqeggxlmrbyitmhbfcsumackq",
        solutionTemplateId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/SolutionTemplates/st",
        solutionTemplateVersion: "bwji",
        solutionInstanceName: "testname",
        targetId: "vpzvkhtgzwtrnbktyvsltfcel",
        dependencies: [],
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await targetsReviewSolutionVersionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
