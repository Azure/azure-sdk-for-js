// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post request for bulk review
 *
 * @summary post request for bulk review
 * x-ms-original-file: 2026-05-01-preview/SolutionTemplateVersions_BulkReviewSolution_MaximumSet_Gen.json
 */
async function solutionTemplateVersionsBulkReviewSolutionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutionTemplateVersions.bulkReviewSolution(
    "rgconfigurationmanager",
    "testname",
    "1.0.0",
    {
      targets: [
        {
          targetId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target",
          solutionDependencies: [
            {
              solutionVersionId:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target/Solutions/solution/Versions/solution-1.0.0.1",
              solutionTemplateId:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/SolutionTemplates/st",
              solutionTemplateVersion: "bwji",
              solutionInstanceName: "testname",
              targetId:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target",
              dependencies: [],
            },
          ],
          solutionInstanceName: "testname",
          solutionConfiguration: "hizjdicxgebxdoxvplltbemeg",
        },
      ],
      solutionInstanceName: "testname",
      solutionDependencies: [
        {
          solutionVersionId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target/Solutions/solution/Versions/solution-1.0.0.1",
          solutionTemplateId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/SolutionTemplates/st",
          solutionTemplateVersion: "bwji",
          solutionInstanceName: "testname",
          targetId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target",
          dependencies: [],
        },
      ],
      solutionConfiguration: "jrmogjyqtgidoxbvbztkz",
    },
  );
}

async function main() {
  await solutionTemplateVersionsBulkReviewSolutionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
