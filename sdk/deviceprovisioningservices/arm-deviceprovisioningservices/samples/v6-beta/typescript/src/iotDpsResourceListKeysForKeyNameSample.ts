// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list primary and secondary keys for a specific key name
 *
 * @summary list primary and secondary keys for a specific key name
 * x-ms-original-file: 2025-02-01-preview/DPSGetKey.json
 */
async function dpsGetKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.listKeysForKeyName(
    "myResourceGroup",
    "myFirstProvisioningService",
    "testKey",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dpsGetKey();
}

main().catch(console.error);
