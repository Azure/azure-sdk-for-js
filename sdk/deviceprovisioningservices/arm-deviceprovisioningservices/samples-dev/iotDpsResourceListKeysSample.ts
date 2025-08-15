// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List the primary and secondary keys for a provisioning service.
 *
 * @summary List the primary and secondary keys for a provisioning service.
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSListKeys.json
 */
async function dpsListKeys(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const provisioningServiceName = "myFirstProvisioningService";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotDpsResource.listKeys(
    provisioningServiceName,
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await dpsListKeys();
}

main().catch(console.error);
