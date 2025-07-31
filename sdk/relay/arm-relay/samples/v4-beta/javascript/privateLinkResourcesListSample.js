// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets lists of resources that supports Privatelinks.
 *
 * @summary gets lists of resources that supports Privatelinks.
 * x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateLinkResourcesList.json
 */
async function nameSpacePrivateLinkResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.privateLinkResources.list(
    "resourcegroup",
    "example-RelayNamespace-5849",
  );
  console.log(result);
}

async function main() {
  await nameSpacePrivateLinkResourcesGet();
}

main().catch(console.error);
