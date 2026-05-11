// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AttestationManagementClient } = require("@azure/arm-attestation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the private endpoint connections associated with the attestation provider.
 *
 * @summary list all the private endpoint connections associated with the attestation provider.
 * x-ms-original-file: 2021-06-01/AttestationProviderListPrivateEndpointConnections.json
 */
async function attestationProviderListPrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list("res6977", "sto2527")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await attestationProviderListPrivateEndpointConnections();
}

main().catch(console.error);
