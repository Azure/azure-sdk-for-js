// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Target Resource
 *
 * @summary update a Target Resource
 * x-ms-original-file: 2025-06-01/Targets_Update_MaximumSet_Gen.json
 */
async function targetsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.update("rgconfigurationmanager", "testname", {
    properties: {
      description: "yhnhdpznncdvncmnvoeohqjx",
      displayName: "pguujtzjjvixgjitugybrefp",
      targetSpecification: {},
      capabilities: ["dasqhyxfakivfzqb"],
      contextId:
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}",
      hierarchyLevel: "hfyntwxetgsmnucbjvvphtyxu",
      solutionScope: "testname",
      state: "active",
    },
    tags: { key8026: "yoosplotwgoquvpox" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await targetsUpdateMaximumSet();
}

main().catch(console.error);
