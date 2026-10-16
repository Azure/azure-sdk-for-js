// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the flow resource.
 *
 * @summary updates the flow resource.
 * x-ms-original-file: 2026-02-06-preview/patchFlow.json
 */
async function updatesTheFlowResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.flows.update("testRG", "testConnection", "testFlow", {});
}

async function main(): Promise<void> {
  await updatesTheFlowResource();
}

main().catch(console.error);
