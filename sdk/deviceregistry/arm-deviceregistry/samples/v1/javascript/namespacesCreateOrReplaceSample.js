// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Namespace
 *
 * @summary create a Namespace
 * x-ms-original-file: 2025-10-01/CreateOrReplace_Namespace_With_Endpoints.json
 */
async function createOrReplaceNamespaceWithEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrReplace(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
    {
      location: "North Europe",
      properties: {
        messaging: {
          endpoints: {
            eventGridEndpoint: {
              endpointType: "Microsoft.Devices/IoTHubs",
              address: "https://myeventgridtopic.westeurope-1.eventgrid.azure.net/api/events",
            },
            anotherEventGridEndpoint: {
              endpointType: "Microsoft.Devices/IoTHubs",
              address: "https://myeventgridtopic2.westeurope-1.eventgrid.azure.net/api/events",
            },
          },
        },
      },
      identity: { type: "SystemAssigned" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrReplaceNamespaceWithEndpoints();
}

main().catch(console.error);
