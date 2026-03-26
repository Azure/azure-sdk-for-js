// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the Cognitive Services account.
 *
 * @summary update the state of specified private endpoint connection associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/PutPrivateEndpointConnection.json
 */
async function putPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "res7687",
    "sto9699",
    "{privateEndpointConnectionName}",
    {
      properties: {
        privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putPrivateEndpointConnection();
}

main().catch(console.error);
