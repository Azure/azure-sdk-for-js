// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Execution Resource
 *
 * @summary delete Execution Resource
 * x-ms-original-file: 2026-05-01-preview/Executions_Delete_MaximumSet_Gen.json
 */
async function executionsDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.executions.delete(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "abcde",
    "abcde",
  );
}

async function main() {
  await executionsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
