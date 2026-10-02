// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates new or updates existing Diagnostic resource.
 *
 * @summary creates new or updates existing Diagnostic resource.
 * x-ms-original-file: 2026-05-01-preview/Diagnostics_CreateOrUpdate_MaximumSet_Gen.json
 */
async function diagnosticsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.createOrUpdate("rgconfigurationmanager", "testname", {
    properties: {},
    extendedLocation: { name: "ggfwkwklvvkrmlysvvhcj", type: "EdgeZone" },
    tags: {},
    location: "xxriixfihzwn",
  });
  console.log(result);
}

async function main() {
  await diagnosticsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
