// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @summary Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/NameSpaces/EHNameSpaceUpdate.json
 */

import { EHNamespace, EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function namespacesUpdate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "SampleSubscription";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "ResurceGroupSample";
  const namespaceName = "NamespaceSample";
  const parameters: EHNamespace = {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/MicrosoftManagedIdentity/userAssignedIdentities/ud2":
          {},
      },
    },
    location: "East US",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.update(
    resourceGroupName,
    namespaceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesUpdate();
}

main().catch(console.error);
