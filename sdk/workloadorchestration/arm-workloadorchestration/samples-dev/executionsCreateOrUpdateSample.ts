// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Execution Resource
 *
 * @summary create or update Execution Resource
 * x-ms-original-file: 2025-06-01/Executions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function executionsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE6D9590-0D52-4B1C-935C-FE49DBF838EB";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.executions.createOrUpdate(
    "rgconfigurationmanager",
    "abcde",
    "abcde",
    "abcde",
    "abcde",
    {
      properties: { specification: {}, workflowVersionId: "souenlqwltljsojdcbpc" },
      extendedLocation: { name: "ugf", type: "EdgeZone" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executionsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
