// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Refreshes any information about the association.
 *
 * @summary Refreshes any information about the association.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/NameSpaces/NetworkSecurityPerimeterConfigurationReconcile.json
 */

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkSecurityPerimeterConfigurationList(): Promise<void> {
  const subscriptionId = process.env["EVENTHUB_SUBSCRIPTION_ID"] || "subID";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "SDK-EventHub-4794";
  const namespaceName = "sdk-Namespace-5828";
  const resourceAssociationName = "resourceAssociation1";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result =
    await client.networkSecurityPerimeterConfigurations.beginCreateOrUpdateAndWait(
      resourceGroupName,
      namespaceName,
      resourceAssociationName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
