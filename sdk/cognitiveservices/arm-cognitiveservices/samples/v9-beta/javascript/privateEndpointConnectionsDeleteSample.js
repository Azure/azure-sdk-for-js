// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the Cognitive Services account.
 *
 * @summary deletes the specified private endpoint connection associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/DeletePrivateEndpointConnection.json
 */
async function deletePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "res6977",
    "sto2527",
    "{privateEndpointConnectionName}",
  );
}

async function main() {
  await deletePrivateEndpointConnection();
}

main().catch(console.error);
