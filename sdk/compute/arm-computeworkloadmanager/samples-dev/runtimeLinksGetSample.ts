// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a runtime link.
 *
 * @summary gets a runtime link.
 * x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Get.json
 */
async function getARuntimeLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.runtimeLinks.get("rg-workload", "managed-agents-prod", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await getARuntimeLink();
}

main().catch(console.error);
