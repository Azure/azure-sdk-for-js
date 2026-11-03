// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Namespace
 *
 * @summary create a Namespace
 * x-ms-original-file: 2026-03-01-preview/CreateOrReplace_Namespace_With_Endpoints.json
 */
async function createOrReplaceNamespaceWithEndpoints(): Promise<void> {
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
            iothubEndpoint: {
              endpointType: "Microsoft.Devices/IotHubs",
              address: "https://iothub-for-dps.azure-devices.net",
            },
            anotherIothubEndpoint: {
              endpointType: "Microsoft.Devices/IotHubs",
              address: "https://iothub-for-dps-2.azure-devices.net",
            },
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceNamespaceWithEndpoints();
}

main().catch(console.error);
