// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing namespace. This operation also removes all associated notificationHubs under the namespace.
 *
 * @summary deletes an existing namespace. This operation also removes all associated notificationHubs under the namespace.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/Delete.json
 */
async function namespacesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  await client.namespaces.delete("5ktrial", "nh-sdk-ns");
}

async function main() {
  await namespacesDelete();
}

main().catch(console.error);
