// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the Azure Dev Spaces Controllers with their properties in the subscription.
 *
 * @summary Lists all the Azure Dev Spaces Controllers with their properties in the subscription.
 * x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersList_example.json
 */

import { DevSpacesManagementClient } from "@azure/arm-devspaces";
import { DefaultAzureCredential } from "@azure/identity";

async function controllersList(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new DevSpacesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.controllers.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

controllersList().catch(console.error);
