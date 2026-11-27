// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Workflow Version Resource
 *
 * @summary create or update a Workflow Version Resource
 * x-ms-original-file: 2026-05-01-preview/WorkflowVersions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function workflowVersionsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.workflowVersions.createOrUpdate(
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
      extendedLocation: { name: "ggfwkwklvvkrmlysvvhcj", type: "EdgeZone" },
    },
  );
  console.log(result);
}

async function main() {
  await workflowVersionsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
