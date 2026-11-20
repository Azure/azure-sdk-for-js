// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Schema Version Resource
 *
 * @summary create a Schema Version Resource
 * x-ms-original-file: 2026-05-01-preview/Schemas_CreateVersion_MaximumSet_Gen.json
 */
async function schemasCreateVersionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.schemas.createVersion("rgconfigurationmanager", "testname", {
    updateType: "Major",
    version: "1.0.0",
    schemaVersion: { properties: { value: "gjohcqdzm" } },
  });
  console.log(result);
}

async function main() {
  await schemasCreateVersionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
