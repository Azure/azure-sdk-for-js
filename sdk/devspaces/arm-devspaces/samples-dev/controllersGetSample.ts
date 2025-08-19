// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevSpacesManagementClient } from "@azure/arm-devspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the properties for an Azure Dev Spaces Controller.
 *
 * @summary Gets the properties for an Azure Dev Spaces Controller.
 * x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersGet_example.json
 */
async function controllersGet(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const name = "myControllerResource";
  const credential = new DefaultAzureCredential();
  const client = new DevSpacesManagementClient(credential, subscriptionId);
  const result = await client.controllers.get(resourceGroupName, name);
  console.log(result);
}

controllersGet().catch(console.error);
