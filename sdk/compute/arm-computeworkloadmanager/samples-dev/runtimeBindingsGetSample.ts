// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a runtime binding.
 *
 * @summary gets a runtime binding.
 * x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Get.json
 */
async function getARuntimeBinding(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.runtimeBindings.get(
    "rg-workload",
    "managed-agents-prod",
    "kubernetes-default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARuntimeBinding();
}

main().catch(console.error);
