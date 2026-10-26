// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates mutable workload space properties.
 *
 * @summary updates mutable workload space properties.
 * x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Update.json
 */
async function updateWorkloadSpaceTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.workloadSpaces.update("rg-workload", "managed-agents-prod", {
    tags: { environment: "Production", costCenter: "AI-Platform" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateWorkloadSpaceTags();
}

main().catch(console.error);
