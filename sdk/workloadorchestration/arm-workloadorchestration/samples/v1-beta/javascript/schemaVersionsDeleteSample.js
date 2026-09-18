// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Schema Version Resource
 *
 * @summary delete a Schema Version Resource
 * x-ms-original-file: 2026-05-01-preview/SchemaVersions_Delete_MaximumSet_Gen.json
 */
async function schemaVersionsDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.schemaVersions.delete("rgconfigurationmanager", "testname", "1.0.0");
}

async function main() {
  await schemaVersionsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
