// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete private end point connection for a private link service in a subscription.
 *
 * @summary delete private end point connection for a private link service in a subscription.
 * x-ms-original-file: 2025-05-01/PrivateLinkServiceDeletePrivateEndpointConnection.json
 */
async function deletePrivateEndPointConnectionForAPrivateLinkService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.privateLinkServices.deletePrivateEndpointConnection(
    "rg1",
    "testPls",
    "testPlePeConnection",
  );
}

async function main() {
  await deletePrivateEndPointConnectionForAPrivateLinkService();
}

main().catch(console.error);
