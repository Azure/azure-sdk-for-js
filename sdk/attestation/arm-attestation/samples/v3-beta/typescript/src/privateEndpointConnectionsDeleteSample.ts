// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the attestation provider.
 *
 * @summary deletes the specified private endpoint connection associated with the attestation provider.
 * x-ms-original-file: 2021-06-01/AttestationProviderDeletePrivateEndpointConnection.json
 */
async function attestationProviderDeletePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new AttestationManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "res6977",
    "sto2527",
    "{privateEndpointConnectionName}",
  );
}

async function main(): Promise<void> {
  await attestationProviderDeletePrivateEndpointConnection();
}

main().catch(console.error);
