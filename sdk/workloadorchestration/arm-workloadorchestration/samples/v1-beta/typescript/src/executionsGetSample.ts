// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Execution Resource
 *
 * @summary get Execution Resource
 * x-ms-original-file: 2025-06-01/Executions_Get_MaximumSet_Gen.json
 */
async function executionsGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE6D9590-0D52-4B1C-935C-FE49DBF838EB";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.executions.get(
    "rgconfigurationmanager",
    "abcde",
    "abcde",
    "abcde",
    "abcde",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executionsGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
