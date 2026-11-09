// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists mitigations under a protected resource.
 *
 * @summary lists mitigations under a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_List.json
 */
async function listMitigations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neuroShieldMitigations.list(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listMitigations();
}

main().catch(console.error);
