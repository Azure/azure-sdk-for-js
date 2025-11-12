// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Namespace
 *
 * @summary update a Namespace
 * x-ms-original-file: 2025-10-01/Update_Namespace_Endpoints.json
 */
async function updateNamespaceEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.update("myResourceGroup", "adr-namespace-gbk0925-n01", {
    properties: {
      messaging: {
        endpoints: {
          eventGridEndpoint: {
            endpointType: "Microsoft.Devices/IoTHubs",
            address: "https://myeventgridtopic.westeurope-1.eventgrid.azure.net/api/events",
          },
        },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateNamespaceEndpoints();
}

main().catch(console.error);
