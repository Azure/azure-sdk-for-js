// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the List operation gets information about the dedicated HSMs associated with the subscription and within the specified resource group.
 *
 * @summary the List operation gets information about the dedicated HSMs associated with the subscription and within the specified resource group.
 * x-ms-original-file: 2025-03-31/DedicatedHsm_ListByResourceGroup.json
 */
async function listDedicatedHSMDevicesInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHsm.listByResourceGroup("hsm-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to the List operation gets information about the dedicated HSMs associated with the subscription and within the specified resource group.
 *
 * @summary the List operation gets information about the dedicated HSMs associated with the subscription and within the specified resource group.
 * x-ms-original-file: 2025-03-31/PaymentHsm_ListByResourceGroup.json
 */
async function listDedicatedHSMDevicesInAResourceGroupIncludingPaymentHSM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHsm.listByResourceGroup("hsm-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDedicatedHSMDevicesInAResourceGroup();
  await listDedicatedHSMDevicesInAResourceGroupIncludingPaymentHSM();
}

main().catch(console.error);
