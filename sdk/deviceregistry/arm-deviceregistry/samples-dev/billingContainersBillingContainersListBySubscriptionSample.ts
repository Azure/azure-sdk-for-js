// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list BillingContainer resources by subscription ID
 *
 * @summary list BillingContainer resources by subscription ID
 * x-ms-original-file: 2024-11-01/List_BillingContainers_Subscription.json
 */
async function listBillingContainersSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.billingContainers.BillingContainers_listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBillingContainersSubscription();
}

main().catch(console.error);
