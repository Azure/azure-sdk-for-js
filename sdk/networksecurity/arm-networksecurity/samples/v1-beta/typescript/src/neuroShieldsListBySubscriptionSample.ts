// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all NeuroShield resources in a subscription.
 *
 * @summary gets all NeuroShield resources in a subscription.
 * x-ms-original-file: 2026-10-01-preview/NeuroShields_ListBySubscription.json
 */
async function listNeuroShieldResourcesBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neuroShields.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNeuroShieldResourcesBySubscription();
}

main().catch(console.error);
