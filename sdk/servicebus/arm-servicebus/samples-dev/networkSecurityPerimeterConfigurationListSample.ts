// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets list of current NetworkSecurityPerimeterConfiguration for Namespace
 *
 * @summary gets list of current NetworkSecurityPerimeterConfiguration for Namespace
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/NetworkSecurityPerimeterConfigurationList.json
 */
async function namspaceNetworkSecurityPerimeterConfigurationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfiguration.list(
    "SDK-ServiceBus-4794",
    "sdk-Namespace-5828",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await namspaceNetworkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
