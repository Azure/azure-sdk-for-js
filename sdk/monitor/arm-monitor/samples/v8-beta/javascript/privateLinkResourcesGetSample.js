// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 *
 * @summary gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopePrivateLinkResourceGet.json
 */
async function getsPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "MyResourceGroup",
    "MyPrivateLinkScope",
    "azuremonitor",
  );
  console.log(result);
}

async function main() {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
