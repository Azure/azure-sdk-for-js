// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the resource types for a specified resource provider.
 *
 * @summary list the resource types for a specified resource provider.
 * x-ms-original-file: 2025-04-01/GetProviderResourceTypes.json
 */
async function getProviderResourceTypes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.providerResourceTypes.list("Microsoft.TestRP");
  console.log(result);
}

async function main() {
  await getProviderResourceTypes();
}

main().catch(console.error);
