// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of currently active sessions on the Bastion.
 *
 * @summary returns the list of currently active sessions on the Bastion.
 * x-ms-original-file: 2025-05-01/BastionSessionsList.json
 */
async function returnsAListOfCurrentlyActiveSessionsOnTheBastion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.getActiveSessions("rg1", "bastionhosttenant");
  console.log(result);
}

async function main() {
  await returnsAListOfCurrentlyActiveSessionsOnTheBastion();
}

main().catch(console.error);
