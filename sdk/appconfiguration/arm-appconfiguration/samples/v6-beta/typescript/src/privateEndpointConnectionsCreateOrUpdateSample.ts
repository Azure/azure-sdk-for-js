// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of the specified private endpoint connection associated with the configuration store. This operation cannot be used to create a private endpoint connection. Private endpoint connections must be created with the Network resource provider.
 *
 * @summary update the state of the specified private endpoint connection associated with the configuration store. This operation cannot be used to create a private endpoint connection. Private endpoint connections must be created with the Network resource provider.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresUpdatePrivateEndpointConnection.json
 */
async function privateEndpointConnectionUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "myResourceGroup",
    "contoso",
    "myConnection",
    { privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionUpdate();
}

main().catch(console.error);
