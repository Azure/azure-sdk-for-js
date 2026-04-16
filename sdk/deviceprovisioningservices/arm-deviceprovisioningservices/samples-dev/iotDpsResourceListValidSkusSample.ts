// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of valid SKUs and tiers for a provisioning service.
 *
 * @summary gets the list of valid SKUs and tiers for a provisioning service.
 * x-ms-original-file: 2025-02-01-preview/DPSGetValidSku.json
 */
async function dpsGetValidSku(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotDpsResource.listValidSkus(
    "myResourceGroup",
    "myFirstProvisioningService",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dpsGetValidSku();
}

main().catch(console.error);
