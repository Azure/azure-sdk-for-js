// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a notificationHub authorization rule
 *
 * @summary deletes a notificationHub authorization rule
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/AuthorizationRuleDelete.json
 */
async function notificationHubsDeleteAuthorizationRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  await client.notificationHubs.deleteAuthorizationRule(
    "5ktrial",
    "nh-sdk-ns",
    "nh-sdk-hub",
    "DefaultListenSharedAccessSignature",
  );
}

async function main() {
  await notificationHubsDeleteAuthorizationRule();
}

main().catch(console.error);
