// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Schema Version Resource
 *
 * @summary update a Schema Version Resource
 * x-ms-original-file: 2026-05-01-preview/SchemaVersions_Update_MaximumSet_Gen.json
 */
async function schemaVersionsUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.schemaVersions.update("rgconfigurationmanager", "testname", "1.0.0", {
    properties: { value: "vmzzkntnuwfgemhnlogkglitm" },
  });
  console.log(result);
}

async function main() {
  await schemaVersionsUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
