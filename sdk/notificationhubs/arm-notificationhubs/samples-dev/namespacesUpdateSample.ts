// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patches the existing namespace.
 *
 * @summary patches the existing namespace.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/Update.json
 */
async function namespacesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsClient(credential, subscriptionId);
  const result = await client.namespaces.update("5ktrial", "nh-sdk-ns", {
    properties: {
      pnsCredentials: {
        gcmCredential: {
          properties: {
            gcmEndpoint: "https://fcm.googleapis.com/fcm/send",
            googleApiKey: "#############################",
          },
        },
      },
    },
    sku: { name: "Free" },
    tags: { tag1: "value3" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesUpdate();
}

main().catch(console.error);
