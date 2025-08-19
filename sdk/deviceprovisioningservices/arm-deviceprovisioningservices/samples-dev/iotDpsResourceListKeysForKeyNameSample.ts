// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List primary and secondary keys for a specific key name
 *
 * @summary List primary and secondary keys for a specific key name
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSGetKey.json
 */

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dpsGetKey(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const provisioningServiceName = "myFirstProvisioningService";
  const keyName = "testKey";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.listKeysForKeyName(
    provisioningServiceName,
    keyName,
    resourceGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dpsGetKey();
}

main().catch(console.error);
