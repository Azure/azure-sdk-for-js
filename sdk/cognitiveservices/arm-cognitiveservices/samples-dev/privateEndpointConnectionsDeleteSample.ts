// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the Cognitive Services account.
 *
 * @summary deletes the specified private endpoint connection associated with the Cognitive Services account.
 * x-ms-original-file: 2026-03-01/DeletePrivateEndpointConnection.json
 */
async function deletePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "res6977",
    "sto2527",
    "{privateEndpointConnectionName}",
  );
}

async function main(): Promise<void> {
  await deletePrivateEndpointConnection();
}

main().catch(console.error);
