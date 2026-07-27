// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refreshes any information about the association.
 *
 * @summary refreshes any information about the association.
 * x-ms-original-file: 2026-01-01/NameSpaces/NetworkSecurityPerimeterConfigurationReconcile.json
 */
async function networkSecurityPerimeterConfigurationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subID";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.createOrUpdate(
    "SDK-EventHub-4794",
    "sdk-Namespace-5828",
    "resourceAssociation1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
