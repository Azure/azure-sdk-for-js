// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Execution Resource
 *
 * @summary delete Execution Resource
 * x-ms-original-file: 2025-06-01/Executions_Delete_MaximumSet_Gen.json
 */
async function executionsDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE6D9590-0D52-4B1C-935C-FE49DBF838EB";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.executions.delete("rgconfigurationmanager", "abcde", "abcde", "abcde", "abcde");
}

async function main(): Promise<void> {
  await executionsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
