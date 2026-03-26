// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all private endpoints in a subscription.
 *
 * @summary gets all private endpoints in a subscription.
 * x-ms-original-file: 2025-05-01/PrivateEndpointListAll.json
 */
async function listAllPrivateEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpoints.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllPrivateEndpoints();
}

main().catch(console.error);
