// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post request to publish
 *
 * @summary post request to publish
 * x-ms-original-file: 2025-06-01/Targets_PublishSolutionVersion_MaximumSet_Gen.json
 */
async function targetsPublishSolutionVersionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.publishSolutionVersion("rgconfigurationmanager", "testname", {
    solutionVersionId:
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await targetsPublishSolutionVersionMaximumSet();
}

main().catch(console.error);
