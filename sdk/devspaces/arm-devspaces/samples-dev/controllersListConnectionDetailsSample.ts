// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists connection details for the underlying container resources of an Azure Dev Spaces Controller.
 *
 * @summary Lists connection details for the underlying container resources of an Azure Dev Spaces Controller.
 * x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersListConnectionDetails_example.json
 */

import type { ListConnectionDetailsParameters } from "@azure/arm-devspaces";
import { DevSpacesManagementClient } from "@azure/arm-devspaces";
import { DefaultAzureCredential } from "@azure/identity";

async function controllersListConnectionDetails(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const name = "myControllerResource";
  const listConnectionDetailsParameters: ListConnectionDetailsParameters = {
    targetContainerHostResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerService/managedClusters/myCluster",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevSpacesManagementClient(credential, subscriptionId);
  const result = await client.controllers.listConnectionDetails(
    resourceGroupName,
    name,
    listConnectionDetailsParameters,
  );
  console.log(result);
}

controllersListConnectionDetails().catch(console.error);
