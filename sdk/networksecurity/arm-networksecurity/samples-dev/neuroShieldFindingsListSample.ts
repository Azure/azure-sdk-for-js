// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists findings under a protected resource.
 *
 * @summary lists findings under a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_List.json
 */
async function listFindings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neuroShieldFindings.list(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFindings();
}

main().catch(console.error);
