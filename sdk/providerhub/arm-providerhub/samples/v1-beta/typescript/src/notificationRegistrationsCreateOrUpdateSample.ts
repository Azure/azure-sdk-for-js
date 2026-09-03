// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a notification registration.
 *
 * @summary creates or updates a notification registration.
 * x-ms-original-file: 2024-09-01/NotificationRegistrations_CreateOrUpdate.json
 */
async function notificationRegistrationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.notificationRegistrations.createOrUpdate(
    "Microsoft.Contoso",
    "fooNotificationRegistration",
    {
      properties: {
        includedEvents: ["*/write", "Microsoft.Contoso/employees/delete"],
        messageScope: "RegisteredSubscriptions",
        notificationEndpoints: [
          {
            locations: ["", "East US"],
            notificationDestination:
              "/subscriptions/ac6bcfb5-3dc1-491f-95a6-646b89bf3e88/resourceGroups/mgmtexp-eastus/providers/Microsoft.EventHub/namespaces/unitedstates-mgmtexpint/eventhubs/armlinkednotifications",
          },
          {
            locations: ["North Europe"],
            notificationDestination:
              "/subscriptions/ac6bcfb5-3dc1-491f-95a6-646b89bf3e88/resourceGroups/mgmtexp-northeurope/providers/Microsoft.EventHub/namespaces/europe-mgmtexpint/eventhubs/armlinkednotifications",
          },
        ],
        notificationMode: "EventHub",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await notificationRegistrationsCreateOrUpdate();
}

main().catch(console.error);
