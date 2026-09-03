// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the metadata of the provisioning service without SAS keys.
 *
 * @summary get the metadata of the provisioning service without SAS keys.
 * x-ms-original-file: 2025-02-01-preview/DPSGet.json
 */
async function dpsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.get("myResourceGroup", "myFirstProvisioningService");
  console.log(result);
}

async function main(): Promise<void> {
  await dpsGet();
}

main().catch(console.error);
