// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateTrafficManagerManagementClient } from "@azure/arm-privatetrafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Private Traffic Manager profiles within a subscription.
 *
 * @summary lists all Private Traffic Manager profiles within a subscription.
 * x-ms-original-file: 2026-02-09-preview/Profiles_ListBySubscription_MaximumSet_Gen.json
 */
async function profilesListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.profiles.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await profilesListBySubscriptionMaximumSet();
}

main().catch(console.error);
