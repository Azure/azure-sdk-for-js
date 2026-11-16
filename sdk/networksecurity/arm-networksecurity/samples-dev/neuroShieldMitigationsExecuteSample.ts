// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approves and queues a mitigation for execution.
 *
 * @summary approves and queues a mitigation for execution.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Execute.json
 */
async function executeMitigation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldMitigations.execute(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "mitigation-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executeMitigation();
}

main().catch(console.error);
