// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AttestationManagementClient } = require("@azure/arm-attestation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the attestation provider.
 *
 * @summary deletes the specified private endpoint connection associated with the attestation provider.
 * x-ms-original-file: 2021-06-01/AttestationProviderDeletePrivateEndpointConnection.json
 */
async function attestationProviderDeletePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new AttestationManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "res6977",
    "sto2527",
    "{privateEndpointConnectionName}",
  );
}

async function main() {
  await attestationProviderDeletePrivateEndpointConnection();
}

main().catch(console.error);
