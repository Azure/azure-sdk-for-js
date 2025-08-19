// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the metadata of the provisioning service without SAS keys.
 *
 * @summary Get the metadata of the provisioning service without SAS keys.
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSGet.json
 */

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dpsGet(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const provisioningServiceName = "myFirstProvisioningService";
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.get(resourceGroupName, provisioningServiceName);
  console.log(result);
}

async function main(): Promise<void> {
  await dpsGet();
}

main().catch(console.error);
