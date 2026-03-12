// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Azure Dedicated HSM.
 *
 * @summary deletes the specified Azure Dedicated HSM.
 * x-ms-original-file: 2025-03-31/DedicatedHsm_Delete.json
 */
async function deleteADedicatedHSM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  await client.dedicatedHsm.delete("hsm-group", "hsm1");
}

async function main() {
  await deleteADedicatedHSM();
}

main().catch(console.error);
