// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post request for bulk publish
 *
 * @summary post request for bulk publish
 * x-ms-original-file: 2026-05-01-preview/SolutionTemplateVersions_BulkPublishSolution_MaximumSet_Gen.json
 */
async function solutionTemplateVersionsBulkPublishSolutionMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutionTemplateVersions.bulkPublishSolution(
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
          solutionVersionId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Edge/Targets/target/Solutions/solution/Versions/solution-1.0.0.1",
          solutionConfiguration: "mxnhusmdpoxqmbujrudeildj",
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
      solutionConfiguration: "tkkfcy",
    },
  );
}

async function main(): Promise<void> {
  await solutionTemplateVersionsBulkPublishSolutionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
