// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an WorkflowVersion Resource
 *
 * @summary update an WorkflowVersion Resource
 * x-ms-original-file: 2025-06-01/WorkflowVersions_Update_MaximumSet_Gen.json
 */
async function workflowVersionsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.workflowVersions.update(
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
        specification: {},
      },
    },
  );
  console.log(result);
}

async function main() {
  await workflowVersionsUpdateMaximumSet();
}

main().catch(console.error);
