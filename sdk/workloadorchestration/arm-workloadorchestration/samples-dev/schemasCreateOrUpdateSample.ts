// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Schema Resource
 *
 * @summary create or update a Schema Resource
 * x-ms-original-file: 2025-06-01/Schemas_CreateOrUpdate_MaximumSet_Gen.json
 */
async function schemasCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.schemas.createOrUpdate("rgconfigurationmanager", "testname", {
    properties: {},
    tags: { key7017: "rdynaxxagwjzubehiz" },
    location: "alvi",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await schemasCreateOrUpdateMaximumSet();
}

main().catch(console.error);
