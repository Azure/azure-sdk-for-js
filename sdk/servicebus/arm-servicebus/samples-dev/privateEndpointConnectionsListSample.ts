// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the available PrivateEndpointConnections within a namespace.
 *
 * @summary Gets the available PrivateEndpointConnections within a namespace.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/preview/2022-10-01-preview/examples/NameSpaces/PrivateEndPointConnectionList.json
 */

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nameSpaceCreate(): Promise<void> {
  const subscriptionId = process.env["SERVICEBUS_SUBSCRIPTION_ID"] || "subID";
  const resourceGroupName = process.env["SERVICEBUS_RESOURCE_GROUP"] || "SDK-ServiceBus-4794";
  const namespaceName = "sdk-Namespace-5828";
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    resourceGroupName,
    namespaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await nameSpaceCreate();
}

main().catch(console.error);
