// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Schema Reference Resource
 *
 * @summary create or update a Schema Reference Resource
 * x-ms-original-file: 2026-05-01-preview/SchemaReferences_CreateOrUpdate_MaximumSet_Gen.json
 */
async function schemaReferencesCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.schemaReferences.createOrUpdate(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "default",
    { properties: { schemaId: "fpztlfnz" } },
  );
  console.log(result);
}

async function main() {
  await schemaReferencesCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
