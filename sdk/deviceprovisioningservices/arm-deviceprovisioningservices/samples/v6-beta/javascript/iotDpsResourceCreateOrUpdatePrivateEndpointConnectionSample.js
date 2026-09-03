// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the status of a private endpoint connection with the specified name
 *
 * @summary create or update the status of a private endpoint connection with the specified name
 * x-ms-original-file: 2025-02-01-preview/DPSCreateOrUpdatePrivateEndpointConnection.json
 */
async function privateEndpointConnectionCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.createOrUpdatePrivateEndpointConnection(
    "myResourceGroup",
    "myFirstProvisioningService",
    "myPrivateEndpointConnection",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "Approved by johndoe@contoso.com",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionCreateOrUpdate();
}

main().catch(console.error);
