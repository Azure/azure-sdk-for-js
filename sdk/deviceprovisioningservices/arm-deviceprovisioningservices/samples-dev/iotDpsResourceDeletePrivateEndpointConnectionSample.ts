// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete private endpoint connection with the specified name
 *
 * @summary delete private endpoint connection with the specified name
 * x-ms-original-file: 2025-02-01-preview/DPSDeletePrivateEndpointConnection.json
 */
async function privateEndpointConnectionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.deletePrivateEndpointConnection(
    "myResourceGroup",
    "myFirstProvisioningService",
    "myPrivateEndpointConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionDelete();
}

main().catch(console.error);
