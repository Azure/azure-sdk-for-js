// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the storage sync service.
 *
 * @summary gets the specified private endpoint connection associated with the storage sync service.
 * x-ms-original-file: 2022-09-01/PrivateEndpointConnections_Get.json
 */
async function privateEndpointConnectionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "res6977",
    "sss2527",
    "{privateEndpointConnectionName}",
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsGet();
}

main().catch(console.error);
