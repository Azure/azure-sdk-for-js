// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return a NetworkSecurityPerimeterConfigurations resourceAssociationName
 *
 * @summary return a NetworkSecurityPerimeterConfigurations resourceAssociationName
 * x-ms-original-file: 2026-01-01/NameSpaces/NetworkSecurityPerimeterConfigurationAssociationproxy.json
 */
async function networkSecurityPerimeterConfigurationassociationProxyName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.getResourceAssociationName(
    "SDK-EventHub-4794",
    "sdk-Namespace-5828",
    "resourceAssociation1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterConfigurationassociationProxyName();
}

main().catch(console.error);
