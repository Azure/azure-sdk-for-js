// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the given namespace.
 *
 * @summary returns the given namespace.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/Get.json
 */
async function namespacesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.namespaces.get("5ktrial", "nh-sdk-ns");
  console.log(result);
}

async function main() {
  await namespacesGet();
}

main().catch(console.error);
