// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list private endpoint connection properties
 *
 * @summary list private endpoint connection properties
 * x-ms-original-file: 2025-02-01-preview/DPSListPrivateEndpointConnections.json
 */
async function privateEndpointConnectionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.listPrivateEndpointConnections(
    "myResourceGroup",
    "myFirstProvisioningService",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsList();
}

main().catch(console.error);
