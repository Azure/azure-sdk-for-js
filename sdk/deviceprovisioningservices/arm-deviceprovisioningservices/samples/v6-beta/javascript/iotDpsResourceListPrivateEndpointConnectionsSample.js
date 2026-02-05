// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private endpoint connection properties
 *
 * @summary list private endpoint connection properties
 * x-ms-original-file: 2025-02-01-preview/DPSListPrivateEndpointConnections.json
 */
async function privateEndpointConnectionsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.listPrivateEndpointConnections(
    "myResourceGroup",
    "myFirstProvisioningService",
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsList();
}

main().catch(console.error);
