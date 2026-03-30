// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private endpoint connection.
 *
 * @summary gets a private endpoint connection.
 * x-ms-original-file: 2026-01-20-preview/PrivateEndpointConnections_Get.json
 */
async function getAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbPrivateEndpointConnections.get(
    "exampleresourcegroup",
    "examplecluster",
    "exampleprivateendpointconnection.1fa229cd-bf3f-47f0-8c49-afb36723997e",
  );
  console.log(result);
}

async function main() {
  await getAPrivateEndpointConnection();
}

main().catch(console.error);
