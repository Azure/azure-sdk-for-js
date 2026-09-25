// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove Schema Version Resource
 *
 * @summary remove Schema Version Resource
 * x-ms-original-file: 2026-05-01-preview/Schemas_RemoveVersion_MaximumSet_Gen.json
 */
async function schemasRemoveVersionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.schemas.removeVersion("rgconfigurationmanager", "testname", {
    version: "nipqereqmxeiv",
  });
  console.log(result);
}

async function main() {
  await schemasRemoveVersionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
