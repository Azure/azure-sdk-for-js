// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers a new health check run. The execution and health check result can be tracked via the network Connection health check details.
 *
 * @summary triggers a new health check run. The execution and health check result can be tracked via the network Connection health check details.
 * x-ms-original-file: 2026-01-01-preview/NetworkConnections_RunHealthChecks.json
 */
async function networkConnectionsRunHealthChecks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.networkConnections.runHealthChecks("rg1", "uswest3network");
}

async function main() {
  await networkConnectionsRunHealthChecks();
}

main().catch(console.error);
