// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformClient } from "@azure/arm-powerplatform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private endpoint connection.
 *
 * @summary gets a private endpoint connection.
 * x-ms-original-file: 2020-10-30-preview/PrivateEndpointConnectionGet.json
 */
async function getsPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "rg1",
    "ddb1",
    "privateEndpointConnectionName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
