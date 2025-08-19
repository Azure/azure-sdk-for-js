// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Azure dedicated HSM.
 *
 * @summary gets the specified Azure dedicated HSM.
 * x-ms-original-file: 2025-03-31/DedicatedHsm_Get.json
 */
async function getADedicatedHSM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.dedicatedHsm.get("hsm-group", "hsm1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Azure dedicated HSM.
 *
 * @summary gets the specified Azure dedicated HSM.
 * x-ms-original-file: 2025-03-31/PaymentHsm_Get.json
 */
async function getAPaymentHSM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.dedicatedHsm.get("hsm-group", "hsm1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Azure dedicated HSM.
 *
 * @summary gets the specified Azure dedicated HSM.
 * x-ms-original-file: 2025-03-31/PaymentHsm_Get_With_2018-10-31Preview_Version.json
 */
async function getAPaymentHSMWith20181031PreviewApiVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.dedicatedHsm.get("hsm-group", "hsm1");
  console.log(result);
}

async function main(): Promise<void> {
  await getADedicatedHSM();
  await getAPaymentHSM();
  await getAPaymentHSMWith20181031PreviewApiVersion();
}

main().catch(console.error);
