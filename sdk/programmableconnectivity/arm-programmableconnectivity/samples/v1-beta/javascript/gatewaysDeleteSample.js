// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProgrammableConnectivityClient } = require("@azure/arm-programmableconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Gateway.
 *
 * @summary delete a Gateway.
 * x-ms-original-file: 2024-01-15-preview/Gateways_Delete_MinimumSet_Gen.json
 */
async function gatewaysDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  await client.gateways.delete("rgopenapi", "udveaau");
}

async function main() {
  await gatewaysDelete();
}

main().catch(console.error);
