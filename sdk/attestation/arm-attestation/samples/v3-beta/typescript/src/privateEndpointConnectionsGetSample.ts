// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the attestation provider.
 *
 * @summary gets the specified private endpoint connection associated with the attestation provider.
 * x-ms-original-file: 2021-06-01/AttestationProviderGetPrivateEndpointConnection.json
 */
async function attestationProviderGetPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "res6977",
    "sto2527",
    "{privateEndpointConnectionName}",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await attestationProviderGetPrivateEndpointConnection();
}

main().catch(console.error);
