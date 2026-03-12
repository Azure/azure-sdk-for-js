// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates existing Diagnostic resource.
 *
 * @summary updates existing Diagnostic resource.
 * x-ms-original-file: 2025-06-01/Diagnostics_Update_MaximumSet_Gen.json
 */
async function diagnosticsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.update("rgconfigurationmanager", "testname", {
    properties: {},
    tags: { key1922: "efraipifhmdfekwgunngrgvsc" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await diagnosticsUpdateMaximumSet();
}

main().catch(console.error);
