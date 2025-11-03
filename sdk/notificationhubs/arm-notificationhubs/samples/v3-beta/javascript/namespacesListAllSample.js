// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the available namespaces within the subscription.
 *
 * @summary lists all the available namespaces within the subscription.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/ListBySubscription.json
 */
async function namespacesListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await namespacesListAll();
}

main().catch(console.error);
