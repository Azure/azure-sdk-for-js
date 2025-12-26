// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all active directory configurations within the subscription
 *
 * @summary list all active directory configurations within the subscription
 * x-ms-original-file: 2025-09-01-preview/ActiveDirectoryConfigs_ListBySubscription.json
 */
async function activeDirectoryConfigsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.activeDirectoryConfigs.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await activeDirectoryConfigsListBySubscription();
}

main().catch(console.error);
