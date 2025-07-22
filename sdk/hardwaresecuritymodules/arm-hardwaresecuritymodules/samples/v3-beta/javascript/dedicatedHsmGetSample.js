// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Azure dedicated HSM.
 *
 * @summary gets the specified Azure dedicated HSM.
 * x-ms-original-file: 2025-03-31/DedicatedHsm_Get.json
 */
async function getADedicatedHSM() {
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
async function getAPaymentHSM() {
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
async function getAPaymentHSMWith20181031PreviewApiVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.dedicatedHsm.get("hsm-group", "hsm1");
  console.log(result);
}

async function main() {
  await getADedicatedHSM();
  await getAPaymentHSM();
  await getAPaymentHSMWith20181031PreviewApiVersion();
}

main().catch(console.error);
