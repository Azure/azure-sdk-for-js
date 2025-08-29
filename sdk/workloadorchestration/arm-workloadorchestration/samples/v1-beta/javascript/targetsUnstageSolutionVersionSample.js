// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post request to unstage solution version
 *
 * @summary post request to unstage solution version
 * x-ms-original-file: 2025-08-01/Targets_UnstageSolutionVersion_MaximumSet_Gen.json
 */
async function targetsUnstageSolutionVersionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.unstageSolutionVersion("rgconfigurationmanager", "testname", {
    solutionVersionId:
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}",
  });
  console.log(result);
}

async function main() {
  await targetsUnstageSolutionVersionMaximumSet();
}

main().catch(console.error);
