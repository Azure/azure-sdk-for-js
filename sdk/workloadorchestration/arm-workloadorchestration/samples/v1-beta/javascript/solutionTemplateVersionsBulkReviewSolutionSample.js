// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post request for bulk review
 *
 * @summary post request for bulk review
 * x-ms-original-file: 2025-08-01/SolutionTemplateVersions_BulkReviewSolution_MaximumSet_Gen.json
 */
async function solutionTemplateVersionsBulkReviewSolutionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutionTemplateVersions.bulkReviewSolution(
    "rgconfigurationmanager",
    "solution",
    "1.0.0",
    {
      targets: [
        {
          targetId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target",
          solutionInstanceName: "test-instance",
          solutionConfiguration: "scgsymgepbhzayowiqhadetvdboe",
        },
      ],
      solutionInstanceName: "test-instance",
      solutionDependencies: [
        {
          solutionVersionId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target/Solutions/solution/Versions/solution-1.0.0.1",
          solutionTemplateId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/SolutionTemplates/st",
          solutionTemplateVersion: "1.0.0",
          solutionInstanceName: "test-instance",
          targetId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target",
          dependencies: [],
        },
      ],
      solutionConfiguration: "lncnx",
    },
  );
}

async function main() {
  await solutionTemplateVersionsBulkReviewSolutionMaximumSet();
}

main().catch(console.error);
