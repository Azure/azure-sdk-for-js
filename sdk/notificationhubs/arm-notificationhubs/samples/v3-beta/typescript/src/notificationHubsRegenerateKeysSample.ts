// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates the Primary/Secondary Keys to the NotificationHub Authorization Rule
 *
 * @summary regenerates the Primary/Secondary Keys to the NotificationHub Authorization Rule
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/AuthorizationRuleRegenerateKey.json
 */
async function notificationHubsRegenerateKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.notificationHubs.regenerateKeys(
    "5ktrial",
    "nh-sdk-ns",
    "nh-sdk-hub",
    "DefaultListenSharedAccessSignature",
    { policyKey: "PrimaryKey" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await notificationHubsRegenerateKeys();
}

main().catch(console.error);
