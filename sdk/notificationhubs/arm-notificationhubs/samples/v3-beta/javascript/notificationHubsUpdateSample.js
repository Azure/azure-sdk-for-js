// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch a NotificationHub in a namespace.
 *
 * @summary patch a NotificationHub in a namespace.
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/Update.json
 */
async function notificationHubsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.notificationHubs.update(
    "sdkresourceGroup",
    "nh-sdk-ns",
    "sdk-notificationHubs-8708",
    {
      properties: {
        gcmCredential: {
          properties: {
            gcmEndpoint: "https://fcm.googleapis.com/fcm/send",
            googleApiKey: "###################################",
          },
        },
        registrationTtl: "10675199.02:48:05.4775807",
      },
    },
  );
  console.log(result);
}

async function main() {
  await notificationHubsUpdate();
}

main().catch(console.error);
