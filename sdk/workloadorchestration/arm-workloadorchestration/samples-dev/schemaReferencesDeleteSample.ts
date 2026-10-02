// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Schema Reference Resource
 *
 * @summary delete a Schema Reference Resource
 * x-ms-original-file: 2026-05-01-preview/SchemaReferences_Delete_MaximumSet_Gen.json
 */
async function schemaReferencesDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  await client.schemaReferences.delete(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "default",
  );
}

async function main(): Promise<void> {
  await schemaReferencesDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
