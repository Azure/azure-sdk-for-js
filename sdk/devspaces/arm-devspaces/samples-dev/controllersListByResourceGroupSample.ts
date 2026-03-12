// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the Azure Dev Spaces Controllers with their properties in the specified resource group and subscription.
 *
 * @summary Lists all the Azure Dev Spaces Controllers with their properties in the specified resource group and subscription.
 * x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersListByResourceGroup_example.json
 */

import { DevSpacesManagementClient } from "@azure/arm-devspaces";
import { DefaultAzureCredential } from "@azure/identity";

async function controllersListByResourceGroup(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new DevSpacesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.controllers.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

controllersListByResourceGroup().catch(console.error);
