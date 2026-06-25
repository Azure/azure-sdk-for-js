// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Schema Reference Resource
 *
 * @summary delete a Schema Reference Resource
 * x-ms-original-file: 2025-06-01/SchemaReferences_Delete_MaximumSet_Gen.json
 */
async function schemaReferencesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  await client.schemaReferences.delete("gt", "default");
}

async function main(): Promise<void> {
  await schemaReferencesDeleteMaximumSet();
}

main().catch(console.error);
