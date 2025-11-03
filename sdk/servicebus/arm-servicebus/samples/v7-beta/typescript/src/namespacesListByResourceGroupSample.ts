// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the available namespaces within a resource group.
 *
 * @summary gets the available namespaces within a resource group.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceListByResourceGroup.json
 */
async function nameSpaceListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.listByResourceGroup("ArunMonocle")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await nameSpaceListByResourceGroup();
}

main().catch(console.error);
