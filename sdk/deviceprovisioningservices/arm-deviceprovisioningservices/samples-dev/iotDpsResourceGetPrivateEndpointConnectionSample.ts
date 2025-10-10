// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get private endpoint connection properties
 *
 * @summary get private endpoint connection properties
 * x-ms-original-file: 2025-02-01-preview/DPSGetPrivateEndpointConnection.json
 */
async function privateEndpointConnectionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.getPrivateEndpointConnection(
    "myResourceGroup",
    "myFirstProvisioningService",
    "myPrivateEndpointConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionGet();
}

main().catch(console.error);
