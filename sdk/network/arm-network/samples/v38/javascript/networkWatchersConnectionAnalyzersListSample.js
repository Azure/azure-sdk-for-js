// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all connection analyzers in the specified network watcher.
 *
 * @summary lists all connection analyzers in the specified network watcher.
 * x-ms-original-file: 2025-09-01/NetworkWatcherConnectionAnalyzerList.json
 */
async function listConnectionAnalyzers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7f4a1d92-3b6e-4c8f-9a25-e1b8c3d7f024";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkWatchers.connectionAnalyzersList(
    "connectionAnalyzerRG",
    "nw1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listConnectionAnalyzers();
}

main().catch(console.error);
