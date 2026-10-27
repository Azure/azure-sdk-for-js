// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a runtime binding without deleting customer-owned referenced resources.
 *
 * @summary deletes a runtime binding without deleting customer-owned referenced resources.
 * x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Delete.json
 */
async function deleteARuntimeBinding(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  await client.runtimeBindings.delete("rg-workload", "managed-agents-prod", "kubernetes-default");
}

async function main(): Promise<void> {
  await deleteARuntimeBinding();
}

main().catch(console.error);
