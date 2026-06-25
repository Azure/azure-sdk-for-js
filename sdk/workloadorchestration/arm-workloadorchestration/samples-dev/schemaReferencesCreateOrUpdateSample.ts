// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Schema Reference Resource
 *
 * @summary create or update a Schema Reference Resource
 * x-ms-original-file: 2025-06-01/SchemaReferences_CreateOrUpdate_MaximumSet_Gen.json
 */
async function schemaReferencesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.schemaReferences.createOrUpdate("gt", "default", {
    properties: { schemaId: "vxgxfkfws" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await schemaReferencesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
