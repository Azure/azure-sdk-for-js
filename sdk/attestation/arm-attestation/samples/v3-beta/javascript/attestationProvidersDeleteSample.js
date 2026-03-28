// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AttestationManagementClient } = require("@azure/arm-attestation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Attestation Service.
 *
 * @summary delete Attestation Service.
 * x-ms-original-file: 2021-06-01/Delete_AttestationProvider.json
 */
async function attestationProvidersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AttestationManagementClient(credential, subscriptionId);
  await client.attestationProviders.delete("sample-resource-group", "myattestationprovider");
}

async function main() {
  await attestationProvidersDelete();
}

main().catch(console.error);
