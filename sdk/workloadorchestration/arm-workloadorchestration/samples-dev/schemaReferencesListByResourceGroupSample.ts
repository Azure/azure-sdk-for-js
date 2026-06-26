// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list by specified resource group
 *
 * @summary list by specified resource group
 * x-ms-original-file: 2025-06-01/SchemaReferences_ListByResourceGroup_MaximumSet_Gen.json
 */
async function schemaReferencesListByResourceGroupMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.schemaReferences.listByResourceGroup("gt")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await schemaReferencesListByResourceGroupMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
