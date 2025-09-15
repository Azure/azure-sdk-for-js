// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Context Resource
 *
 * @summary create or update Context Resource
 * x-ms-original-file: 2025-06-01/Contexts_CreateOrUpdate_MaximumSet_Gen.json
 */
async function contextsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.contexts.createOrUpdate("rgconfigurationmanager", "testname", {
    properties: {
      capabilities: [
        {
          name: "tpylinjcmlnycfpofpxjtqmt",
          description: "banbenutsngwytoqh",
          state: "active",
        },
      ],
      hierarchies: [{ name: "upqe", description: "vg" }],
    },
    tags: { key3046: "clcnhzwypk" },
    location: "pkquwbplcp",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await contextsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
