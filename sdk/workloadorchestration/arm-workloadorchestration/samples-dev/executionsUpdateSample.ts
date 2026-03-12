// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an Execution Resource
 *
 * @summary update an Execution Resource
 * x-ms-original-file: 2025-06-01/Executions_Update_MaximumSet_Gen.json
 */
async function executionsUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FFA229AF-C1A3-4CB6-9E5D-62C25CFBE4D0";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.executions.update(
    "rgconfigurationmanager",
    "abcde",
    "abcde",
    "abcde",
    "abcde",
    { properties: { specification: {}, workflowVersionId: "xjsxzbfltzvbuvn" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executionsUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
