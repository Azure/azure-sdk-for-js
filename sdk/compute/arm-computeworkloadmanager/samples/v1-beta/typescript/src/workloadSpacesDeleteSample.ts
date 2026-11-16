// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a workload space and its owned resources.
 *
 * @summary deletes a workload space and its owned resources.
 * x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Delete.json
 */
async function deleteAWorkloadSpace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  await client.workloadSpaces.delete("rg-workload", "managed-agents-prod");
}

async function main(): Promise<void> {
  await deleteAWorkloadSpace();
}

main().catch(console.error);
