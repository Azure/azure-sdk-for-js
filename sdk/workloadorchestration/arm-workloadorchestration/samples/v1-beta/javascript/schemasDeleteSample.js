// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Schema Resource
 *
 * @summary delete a Schema Resource
 * x-ms-original-file: 2026-05-01-preview/Schemas_Delete_MaximumSet_Gen.json
 */
async function schemasDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.schemas.delete("rgconfigurationmanager", "testname");
}

async function main() {
  await schemasDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
