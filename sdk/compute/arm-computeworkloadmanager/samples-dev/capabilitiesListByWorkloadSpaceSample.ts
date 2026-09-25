// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists capabilities in a workload space.
 *
 * @summary lists capabilities in a workload space.
 * x-ms-original-file: 2026-11-01-preview/Capabilities_ListByWorkloadSpace.json
 */
async function listCapabilitiesInAWorkloadSpace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capabilities.listByWorkloadSpace(
    "rg-workload",
    "managed-agents-prod",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCapabilitiesInAWorkloadSpace();
}

main().catch(console.error);
