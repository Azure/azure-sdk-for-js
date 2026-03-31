// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of currently active sessions on the Bastion.
 *
 * @summary returns the list of currently active sessions on the Bastion.
 * x-ms-original-file: 2025-05-01/BastionSessionDelete.json
 */
async function deletesTheSpecifiedActiveSession() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disconnectActiveSessions("rg1", "bastionhosttenant", {
    sessionIds: ["session1", "session2", "session3"],
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await deletesTheSpecifiedActiveSession();
}

main().catch(console.error);
