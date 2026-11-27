// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Schema Reference Resource
 *
 * @summary get a Schema Reference Resource
 * x-ms-original-file: 2026-05-01-preview/SchemaReferences_Get_MaximumSet_Gen.json
 */
async function schemaReferencesGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.schemaReferences.get(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "default",
  );
  console.log(result);
}

async function main() {
  await schemaReferencesGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
