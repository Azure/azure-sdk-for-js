// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an authorization rule for a namespace by name.
 *
 * @summary gets an authorization rule for a namespace by name.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/AuthorizationRuleGet.json
 */
async function namespacesGetAuthorizationRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.namespaces.getAuthorizationRule(
    "5ktrial",
    "nh-sdk-ns",
    "RootManageSharedAccessKey",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesGetAuthorizationRule();
}

main().catch(console.error);
