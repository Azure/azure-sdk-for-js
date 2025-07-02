// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates/Updates an authorization rule for a NotificationHub
 *
 * @summary creates/Updates an authorization rule for a NotificationHub
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/AuthorizationRuleCreateOrUpdate.json
 */
async function notificationHubsCreateOrUpdateAuthorizationRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsClient(credential, subscriptionId);
  const result = await client.notificationHubs.createOrUpdateAuthorizationRule(
    "5ktrial",
    "nh-sdk-ns",
    "nh-sdk-hub",
    "MyManageSharedAccessKey",
    { properties: { rights: ["Listen", "Send"] } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await notificationHubsCreateOrUpdateAuthorizationRule();
}

main().catch(console.error);
