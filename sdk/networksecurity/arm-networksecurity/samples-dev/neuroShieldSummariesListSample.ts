// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the aggregate fleet overview singleton for a NeuroShield resource.
 *
 * @summary lists the aggregate fleet overview singleton for a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldSummaries_List.json
 */
async function listNeuroShieldFleetSummaries(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neuroShieldSummaries.list("myResourceGroup", "myNeuroShield")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNeuroShieldFleetSummaries();
}

main().catch(console.error);
