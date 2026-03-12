// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the Provisioning Service.
 *
 * @summary deletes the Provisioning Service.
 * x-ms-original-file: 2025-02-01-preview/DPSDelete.json
 */
async function dpsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  await client.iotDpsResource.delete("myResourceGroup", "myFirstProvisioningService");
}

async function main() {
  await dpsDelete();
}

main().catch(console.error);
