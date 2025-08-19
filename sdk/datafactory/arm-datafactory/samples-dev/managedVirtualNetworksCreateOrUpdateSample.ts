// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a managed Virtual Network.
 *
 * @summary Creates or updates a managed Virtual Network.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/ManagedVirtualNetworks_Create.json
 */

import {
  ManagedVirtualNetworkResource,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function managedVirtualNetworksCreate(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const managedVirtualNetworkName = "exampleManagedVirtualNetworkName";
  const managedVirtualNetwork: ManagedVirtualNetworkResource = {
    properties: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.managedVirtualNetworks.createOrUpdate(
    resourceGroupName,
    factoryName,
    managedVirtualNetworkName,
    managedVirtualNetwork,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedVirtualNetworksCreate();
}

main().catch(console.error);
