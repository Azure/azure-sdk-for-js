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
async function schemaReferencesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.schemaReferences.get("jdvtghygpz", "testname");
  console.log(result);
}

async function main(): Promise<void> {
  await schemaReferencesGetMaximumSet();
}

main().catch(console.error);
