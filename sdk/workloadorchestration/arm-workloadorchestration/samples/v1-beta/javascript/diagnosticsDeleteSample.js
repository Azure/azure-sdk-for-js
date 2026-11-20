// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified Diagnostic resource.
 *
 * @summary deletes specified Diagnostic resource.
 * x-ms-original-file: 2026-05-01-preview/Diagnostics_Delete_MaximumSet_Gen.json
 */
async function diagnosticsDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.diagnostics.delete("rgconfigurationmanager", "testname");
}

async function main() {
  await diagnosticsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
