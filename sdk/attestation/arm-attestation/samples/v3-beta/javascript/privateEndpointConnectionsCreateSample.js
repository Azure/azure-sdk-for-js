// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AttestationManagementClient } = require("@azure/arm-attestation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the attestation provider.
 *
 * @summary update the state of specified private endpoint connection associated with the attestation provider.
 * x-ms-original-file: 2021-06-01/AttestationProviderPutPrivateEndpointConnection.json
 */
async function attestationProviderPutPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.create(
    "res7687",
    "sto9699",
    "{privateEndpointConnectionName}",
    { privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" } },
  );
  console.log(result);
}

async function main() {
  await attestationProviderPutPrivateEndpointConnection();
}

main().catch(console.error);
