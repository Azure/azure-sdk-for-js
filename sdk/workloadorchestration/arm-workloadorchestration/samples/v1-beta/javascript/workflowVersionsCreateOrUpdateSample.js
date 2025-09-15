// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Workflow Version Resource
 *
 * @summary create or update a Workflow Version Resource
 * x-ms-original-file: 2025-06-01/WorkflowVersions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function workflowVersionsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.workflowVersions.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
    {
      properties: {
        stageSpec: [
          {
            name: "amrbjd",
            specification: {},
            tasks: [
              {
                name: "xxmeyvmgydbcwxqwjhadjxjod",
                targetId:
                  "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}",
                specification: {},
              },
            ],
            taskOption: {
              concurrency: 3,
              errorAction: {
                mode: "stopOnAnyFailure",
                maxToleratedFailures: 0,
              },
            },
          },
        ],
        state: "InReview",
        specification: {},
      },
      extendedLocation: { name: "szjrwimeqyiue", type: "EdgeZone" },
    },
  );
  console.log(result);
}

async function main() {
  await workflowVersionsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
