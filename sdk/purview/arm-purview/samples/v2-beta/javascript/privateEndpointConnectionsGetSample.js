// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a private endpoint connection
 *
 * @summary get a private endpoint connection
 * x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_Get.json
 */
async function privateEndpointConnectionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "SampleResourceGroup",
    "account1",
    "privateEndpointConnection1",
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsGet();
}

main().catch(console.error);
