// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a runtime link without deleting its runtime bindings.
 *
 * @summary deletes a runtime link without deleting its runtime bindings.
 * x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Delete.json
 */
async function deleteARuntimeLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  await client.runtimeLinks.delete("rg-workload", "managed-agents-prod", "default");
}

async function main(): Promise<void> {
  await deleteARuntimeLink();
}

main().catch(console.error);
