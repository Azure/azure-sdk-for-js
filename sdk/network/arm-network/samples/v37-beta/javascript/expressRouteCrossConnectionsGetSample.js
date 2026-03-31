// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets details about the specified ExpressRouteCrossConnection.
 *
 * @summary gets details about the specified ExpressRouteCrossConnection.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionGet.json
 */
async function getExpressRouteCrossConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.get(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
  );
  console.log(result);
}

async function main() {
  await getExpressRouteCrossConnection();
}

main().catch(console.error);
