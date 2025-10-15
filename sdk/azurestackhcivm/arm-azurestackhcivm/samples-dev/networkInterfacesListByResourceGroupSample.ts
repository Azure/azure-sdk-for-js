// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to lists all of the network interfaces in the specified resource group. Use the nextLink property in the response to get the next page of network interfaces.
 *
 * @summary lists all of the network interfaces in the specified resource group. Use the nextLink property in the response to get the next page of network interfaces.
 * x-ms-original-file: 2025-06-01-preview/NetworkInterfaces_ListByResourceGroup.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function listNetworkInterfaceByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaces.listByResourceGroup("test-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNetworkInterfaceByResourceGroup();
}

main().catch(console.error);
