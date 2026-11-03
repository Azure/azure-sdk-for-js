// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to even though this namespace requires subscription id, resource group and namespace name, it returns a constant payload (for a given namespacE) every time it's called.
 * That's why we don't send it to the sibling RP, but process it directly in the scale unit that received the request.
 *
 * @summary even though this namespace requires subscription id, resource group and namespace name, it returns a constant payload (for a given namespacE) every time it's called.
 * That's why we don't send it to the sibling RP, but process it directly in the scale unit that received the request.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/PrivateLinkResourceGet.json
 */
async function privateEndpointConnectionsGetGroupId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.getGroupId(
    "5ktrial",
    "nh-sdk-ns",
    "namespace",
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsGetGroupId();
}

main().catch(console.error);
