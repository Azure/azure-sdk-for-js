// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Attestation Service.
 *
 * @summary delete Attestation Service.
 * x-ms-original-file: 2021-06-01/Delete_AttestationProvider.json
 */
async function attestationProvidersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AttestationManagementClient(credential, subscriptionId);
  await client.attestationProviders.delete("sample-resource-group", "myattestationprovider");
}

async function main(): Promise<void> {
  await attestationProvidersDelete();
}

main().catch(console.error);
