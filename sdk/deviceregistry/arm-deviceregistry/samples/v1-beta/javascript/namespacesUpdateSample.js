// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Namespace
 *
 * @summary update a Namespace
 * x-ms-original-file: 2026-03-01-preview/Update_Namespace_Endpoints.json
 */
async function updateNamespaceEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.update("myResourceGroup", "adr-namespace-gbk0925-n01", {
    properties: {
      messaging: {
        endpoints: {
          iothubEndpoint: {
            endpointType: "Microsoft.Devices/IotHubs",
            address: "https://iothub-for-dps.azure-devices.net",
          },
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await updateNamespaceEndpoints();
}

main().catch(console.error);
