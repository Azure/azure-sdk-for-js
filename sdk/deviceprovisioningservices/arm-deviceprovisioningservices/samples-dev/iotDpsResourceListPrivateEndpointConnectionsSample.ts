// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List private endpoint connection properties
 *
 * @summary List private endpoint connection properties
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSListPrivateEndpointConnections.json
 */

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateEndpointConnectionsList(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myFirstProvisioningService";
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.listPrivateEndpointConnections(
    resourceGroupName,
    resourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsList();
}

main().catch(console.error);
