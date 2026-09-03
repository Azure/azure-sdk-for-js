// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the Provisioning Service.
 *
 * @summary deletes the Provisioning Service.
 * x-ms-original-file: 2025-02-01-preview/DPSDelete.json
 */
async function dpsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  await client.iotDpsResource.delete("myResourceGroup", "myFirstProvisioningService");
}

async function main(): Promise<void> {
  await dpsDelete();
}

main().catch(console.error);
