// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post request to review configuration
 *
 * @summary post request to review configuration
 * x-ms-original-file: 2025-06-01/Targets_ReviewSolutionVersion_MaximumSet_Gen.json
 */
async function targetsReviewSolutionVersionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.reviewSolutionVersion("rgconfigurationmanager", "testname", {
    solutionTemplateVersionId:
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}/{resourceType}/{resourceName}",
    solutionInstanceName: "testname",
    solutionDependencies: [
      {
        solutionVersionId: "cydzqntmjlqtksbavjwteru",
        solutionTemplateId: "liqauthxnscodbiwktwfwrrsg",
        solutionTemplateVersion: "gordjasyxxrj",
        solutionInstanceName: "testname",
        targetId: "steadvphxtyhjokqicrtg",
        dependencies: [],
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await targetsReviewSolutionVersionMaximumSet();
}

main().catch(console.error);
