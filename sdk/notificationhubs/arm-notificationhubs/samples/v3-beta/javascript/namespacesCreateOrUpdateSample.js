// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates / Updates a Notification Hub namespace. This operation is idempotent.
 *
 * @summary creates / Updates a Notification Hub namespace. This operation is idempotent.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/CreateOrUpdate.json
 */
async function namespacesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdate("5ktrial", "nh-sdk-ns", {
    location: "South Central US",
    properties: {
      networkAcls: {
        ipRules: [
          {
            ipMask: "185.48.100.00/24",
            rights: ["Manage", "Send", "Listen"],
          },
        ],
        publicNetworkRule: { rights: ["Listen"] },
      },
      zoneRedundancy: "Enabled",
    },
    sku: { name: "Standard", tier: "Standard" },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await namespacesCreateOrUpdate();
}

main().catch(console.error);
