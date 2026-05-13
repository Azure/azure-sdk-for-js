// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private endpoint connections associated with the Cognitive Services account.
 *
 * @summary gets the private endpoint connections associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/ListPrivateEndpointConnections.json
 */
async function getPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.list("res6977", "sto2527");
  console.log(result);
}

async function main() {
  await getPrivateEndpointConnection();
}

main().catch(console.error);
