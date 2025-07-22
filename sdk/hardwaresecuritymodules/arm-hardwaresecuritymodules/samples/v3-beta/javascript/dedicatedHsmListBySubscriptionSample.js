// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List operation gets information about the dedicated HSMs associated with the subscription.
 *
 * @summary the List operation gets information about the dedicated HSMs associated with the subscription.
 * x-ms-original-file: 2025-03-31/DedicatedHsm_ListBySubscription.json
 */
async function listDedicatedHSMDevicesInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHsm.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to the List operation gets information about the dedicated HSMs associated with the subscription.
 *
 * @summary the List operation gets information about the dedicated HSMs associated with the subscription.
 * x-ms-original-file: 2025-03-31/PaymentHsm_ListBySubscription.json
 */
async function listDedicatedHSMDevicesInASubscriptionIncludingPaymentHSM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHsm.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDedicatedHSMDevicesInASubscription();
  await listDedicatedHSMDevicesInASubscriptionIncludingPaymentHSM();
}

main().catch(console.error);
