// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an WorkflowVersion Resource
 *
 * @summary update an WorkflowVersion Resource
 * x-ms-original-file: 2026-05-01-preview/WorkflowVersions_Update_MaximumSet_Gen.json
 */
async function workflowVersionsUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.workflowVersions.update(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "abcde",
    {
      properties: {
        stageSpec: [
          {
            name: "jgldxxbuucvqlpstdbbql",
            specification: {},
            tasks: [
              {
                name: "hozvidsilycopddjfuebjglcourar",
                targetId:
                  "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
                specification: {},
              },
            ],
            taskOption: {
              concurrency: 2,
              errorAction: { mode: "stopOnAnyFailure", maxToleratedFailures: 0 },
            },
          },
        ],
        specification: {},
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workflowVersionsUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
