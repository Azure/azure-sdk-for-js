// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the provider permissions.
 *
 * @summary get the provider permissions.
 * x-ms-original-file: 2025-04-01/GetProviderPermissions.json
 */
async function getProviderResourceTypes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.providers.providerPermissions("Microsoft.TestRP");
  console.log(result);
}

async function main() {
  await getProviderResourceTypes();
}

main().catch(console.error);
