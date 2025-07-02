// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Primary and Secondary ConnectionStrings to the namespace.
 *
 * @summary gets the Primary and Secondary ConnectionStrings to the namespace.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/AuthorizationRuleListKeys.json
 */
async function namespacesListKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsClient(credential, subscriptionId);
  const result = await client.namespaces.listKeys(
    "5ktrial",
    "nh-sdk-ns",
    "RootManageSharedAccessKey",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesListKeys();
}

main().catch(console.error);
