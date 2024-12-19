// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list BillingContainer resources by subscription ID
 *
 * @summary list BillingContainer resources by subscription ID
 * x-ms-original-file: 2024-09-01-preview/List_BillingContainers_Subscription.json
 */
async function listBillingContainersSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.billingContainers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listBillingContainersSubscription();
}

main().catch(console.error);
