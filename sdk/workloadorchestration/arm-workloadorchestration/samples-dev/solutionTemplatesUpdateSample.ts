// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Solution Template Resource
 *
 * @summary update a Solution Template Resource
 * x-ms-original-file: 2025-06-01/SolutionTemplates_Update_MaximumSet_Gen.json
 */
async function solutionTemplatesUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionTemplates.update("rgconfigurationmanager", "testname", {
    properties: {
      description: "onqlteg",
      capabilities: ["relsv"],
      state: "active",
      enableExternalValidation: true,
    },
    tags: { key8772: "vbdujmqklnwiepis" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await solutionTemplatesUpdateMaximumSet();
}

main().catch(console.error);
