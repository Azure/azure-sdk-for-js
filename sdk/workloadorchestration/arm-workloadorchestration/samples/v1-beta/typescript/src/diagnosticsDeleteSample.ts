// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specified Diagnostic resource.
 *
 * @summary deletes specified Diagnostic resource.
 * x-ms-original-file: 2025-06-01/Diagnostics_Delete_MaximumSet_Gen.json
 */
async function diagnosticsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.diagnostics.delete("rgconfigurationmanager", "testname");
}

async function main(): Promise<void> {
  await diagnosticsDeleteMaximumSet();
}

main().catch(console.error);
