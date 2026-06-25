// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Schema Reference Resource
 *
 * @summary update a Schema Reference Resource
 * x-ms-original-file: 2025-06-01/SchemaReferences_Update_MaximumSet_Gen.json
 */
async function schemaReferencesUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.schemaReferences.update("gt", "default", {
    properties: { schemaId: "csjhuxsaqkiiefdywxiep" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await schemaReferencesUpdateMaximumSet();
}

main().catch(console.error);
