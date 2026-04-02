// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the specified ExpressRouteCrossConnection.
 *
 * @summary update the specified ExpressRouteCrossConnection.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionUpdate.json
 */
async function updateExpressRouteCrossConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.createOrUpdate(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    { serviceProviderProvisioningState: "NotProvisioned" },
  );
  console.log(result);
}

async function main() {
  await updateExpressRouteCrossConnection();
}

main().catch(console.error);
