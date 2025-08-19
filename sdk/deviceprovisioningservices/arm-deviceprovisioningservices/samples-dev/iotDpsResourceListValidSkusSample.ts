// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the list of valid SKUs and tiers for a provisioning service.
 *
 * @summary Gets the list of valid SKUs and tiers for a provisioning service.
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSGetValidSku.json
 */

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dpsGetValidSku(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const provisioningServiceName = "myFirstProvisioningService";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotDpsResource.listValidSkus(
    provisioningServiceName,
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await dpsGetValidSku();
}

main().catch(console.error);
