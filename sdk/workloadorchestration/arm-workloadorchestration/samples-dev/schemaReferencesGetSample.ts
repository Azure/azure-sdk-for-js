// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Schema Reference Resource
 *
 * @summary get a Schema Reference Resource
 * x-ms-original-file: 2025-06-01/SchemaReferences_Get_MaximumSet_Gen.json
 */
async function schemaReferencesGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.schemaReferences.get("gt", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await schemaReferencesGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
