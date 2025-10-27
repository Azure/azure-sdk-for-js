// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a namespace authorization rule
 *
 * @summary deletes a namespace authorization rule
 * x-ms-original-file: 2023-10-01-preview/Namespaces/AuthorizationRuleDelete.json
 */
async function namespacesDeleteAuthorizationRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  await client.namespaces.deleteAuthorizationRule(
    "5ktrial",
    "nh-sdk-ns",
    "RootManageSharedAccessKey",
  );
}

async function main(): Promise<void> {
  await namespacesDeleteAuthorizationRule();
}

main().catch(console.error);
