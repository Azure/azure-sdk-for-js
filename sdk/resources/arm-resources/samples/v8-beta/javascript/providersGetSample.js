// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified resource provider.
 *
 * @summary gets the specified resource provider.
 * x-ms-original-file: 2025-04-01/GetProvider.json
 */
async function getProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.providers.get("Microsoft.TestRP1");
  console.log(result);
}

async function main() {
  await getProvider();
}

main().catch(console.error);
