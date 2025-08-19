// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Controller } from "@azure/arm-devspaces";
import { DevSpacesManagementClient } from "@azure/arm-devspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Creates an Azure Dev Spaces Controller with the specified create parameters.
 *
 * @summary Creates an Azure Dev Spaces Controller with the specified create parameters.
 * x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersCreate_example.json
 */
async function controllersCreate(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const name = "myControllerResource";
  const controller: Controller = {
    location: "eastus",
    sku: { name: "S1", tier: "Standard" },
    tags: {},
    targetContainerHostCredentialsBase64: "QmFzZTY0IEVuY29kZWQgVmFsdWUK",
    targetContainerHostResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerService/managedClusters/myCluster",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevSpacesManagementClient(credential, subscriptionId);
  const result = await client.controllers.beginCreateAndWait(resourceGroupName, name, controller);
  console.log(result);
}

controllersCreate().catch(console.error);
