// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to partially updates a Network Connection.
 *
 * @summary partially updates a Network Connection.
 * x-ms-original-file: 2026-01-01-preview/NetworkConnections_Patch.json
 */
async function networkConnectionsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.networkConnections.update("rg1", "uswest3network", {
    domainPassword: "New Password value for user",
  });
  console.log(result);
}

async function main() {
  await networkConnectionsUpdate();
}

main().catch(console.error);
