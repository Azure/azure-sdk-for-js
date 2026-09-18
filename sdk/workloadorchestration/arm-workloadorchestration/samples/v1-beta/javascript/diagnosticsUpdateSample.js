// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates existing Diagnostic resource.
 *
 * @summary updates existing Diagnostic resource.
 * x-ms-original-file: 2026-05-01-preview/Diagnostics_Update_MaximumSet_Gen.json
 */
async function diagnosticsUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.update("rgconfigurationmanager", "testname", {
    tags: {},
    properties: {},
  });
  console.log(result);
}

async function main() {
  await diagnosticsUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
