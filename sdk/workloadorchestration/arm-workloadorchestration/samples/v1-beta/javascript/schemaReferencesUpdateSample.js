// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Schema Reference Resource
 *
 * @summary update a Schema Reference Resource
 * x-ms-original-file: 2026-05-01-preview/SchemaReferences_Update_MaximumSet_Gen.json
 */
async function schemaReferencesUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.schemaReferences.update(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "default",
    { properties: { schemaId: "uqhgbbzeyuwjdqnvfmntj" } },
  );
  console.log(result);
}

async function main() {
  await schemaReferencesUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
