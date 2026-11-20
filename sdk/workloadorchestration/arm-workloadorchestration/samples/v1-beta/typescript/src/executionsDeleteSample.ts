// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Execution Resource
 *
 * @summary delete Execution Resource
 * x-ms-original-file: 2026-05-01-preview/Executions_Delete_MaximumSet_Gen.json
 */
async function executionsDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
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

async function main(): Promise<void> {
  await executionsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
