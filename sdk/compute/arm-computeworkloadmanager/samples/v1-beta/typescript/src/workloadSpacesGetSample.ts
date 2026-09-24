// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workload space.
 *
 * @summary gets a workload space.
 * x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Get.json
 */
async function getAWorkloadSpace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.workloadSpaces.get("rg-workload", "managed-agents-prod");
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkloadSpace();
}

main().catch(console.error);
