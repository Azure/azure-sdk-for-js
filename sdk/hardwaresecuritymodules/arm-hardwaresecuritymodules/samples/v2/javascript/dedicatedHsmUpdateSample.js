// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a dedicated HSM in the specified subscription.
 *
 * @summary update a dedicated HSM in the specified subscription.
 * x-ms-original-file: 2025-03-31/DedicatedHsm_Update.json
 */
async function updateAnExistingDedicatedHSM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.dedicatedHsm.update("hsm-group", "hsm1", {
    tags: { Dept: "hsm", Environment: "dogfood", Slice: "A" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a dedicated HSM in the specified subscription.
 *
 * @summary update a dedicated HSM in the specified subscription.
 * x-ms-original-file: 2025-03-31/PaymentHsm_Update.json
 */
async function updateAnExistingPaymentHSM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.dedicatedHsm.update("hsm-group", "hsm1", {
    tags: { Dept: "hsm", Environment: "dogfood", Slice: "A" },
  });
  console.log(result);
}

async function main() {
  await updateAnExistingDedicatedHSM();
  await updateAnExistingPaymentHSM();
}

main().catch(console.error);
