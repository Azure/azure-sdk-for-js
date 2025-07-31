// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a description for the specified Private Endpoint Connection name.
 *
 * @summary gets a description for the specified Private Endpoint Connection name.
 * x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsGet.json
 */
async function nameSpacePrivateEndPointConnectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "myResourceGroup",
    "example-RelayNamespace-5849",
    "{privateEndpointConnection name}",
  );
  console.log(result);
}

async function main() {
  await nameSpacePrivateEndPointConnectionGet();
}

main().catch(console.error);
