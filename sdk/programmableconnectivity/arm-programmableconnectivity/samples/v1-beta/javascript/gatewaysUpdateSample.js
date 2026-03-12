// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProgrammableConnectivityClient } = require("@azure/arm-programmableconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Gateway tags.
 *
 * @summary update Gateway tags.
 * x-ms-original-file: 2024-01-15-preview/Gateways_Update_MaximumSet_Gen.json
 */
async function gatewaysUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.gateways.update("rgopenapi", "pgzk", {
    tags: { key2642: "ykmlftvwwpvcmriffxqh" },
  });
  console.log(result);
}

async function main() {
  await gatewaysUpdate();
}

main().catch(console.error);
