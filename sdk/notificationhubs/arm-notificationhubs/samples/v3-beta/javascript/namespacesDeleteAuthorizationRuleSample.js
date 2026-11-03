// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a namespace authorization rule
 *
 * @summary deletes a namespace authorization rule
 * x-ms-original-file: 2023-10-01-preview/Namespaces/AuthorizationRuleDelete.json
 */
async function namespacesDeleteAuthorizationRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  await client.namespaces.deleteAuthorizationRule(
    "5ktrial",
    "nh-sdk-ns",
    "RootManageSharedAccessKey",
  );
}

async function main() {
  await namespacesDeleteAuthorizationRule();
}

main().catch(console.error);
