// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AttestationManagementClient } = require("@azure/arm-attestation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources supported for the attestation provider.
 *
 * @summary gets the private link resources supported for the attestation provider.
 * x-ms-original-file: 2021-06-01/AttestationProviderListPrivateLinkResources.json
 */
async function attestationProviderListPrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByProvider(
    "MyResourceGroup",
    "myattestationprovider",
  );
  console.log(result);
}

async function main() {
  await attestationProviderListPrivateLinkResources();
}

main().catch(console.error);
