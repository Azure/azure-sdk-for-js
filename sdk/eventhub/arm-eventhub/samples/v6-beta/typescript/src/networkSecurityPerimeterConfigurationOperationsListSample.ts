// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets list of current NetworkSecurityPerimeterConfiguration for Namespace
 *
 * @summary gets list of current NetworkSecurityPerimeterConfiguration for Namespace
 * x-ms-original-file: 2026-01-01/NameSpaces/NetworkSecurityPerimeterConfigurationList.json
 */
async function namspaceNetworkSecurityPerimeterConfigurationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurationOperations.list(
    "SDK-EventHub-4794",
    "sdk-Namespace-5828",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namspaceNetworkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
