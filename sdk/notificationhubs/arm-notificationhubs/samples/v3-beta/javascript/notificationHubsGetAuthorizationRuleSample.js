// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an authorization rule for a NotificationHub by name.
 *
 * @summary gets an authorization rule for a NotificationHub by name.
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/AuthorizationRuleGet.json
 */
async function notificationHubsGetAuthorizationRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.notificationHubs.getAuthorizationRule(
    "5ktrial",
    "nh-sdk-ns",
    "nh-sdk-hub",
    "DefaultListenSharedAccessSignature",
  );
  console.log(result);
}

async function main() {
  await notificationHubsGetAuthorizationRule();
}

main().catch(console.error);
