// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of Attestation Provider.
 *
 * @summary get the status of Attestation Provider.
 * x-ms-original-file: 2021-06-01/Get_AttestationProvider.json
 */
async function attestationProvidersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.get("MyResourceGroup", "myattestationprovider");
  console.log(result);
}

async function main(): Promise<void> {
  await attestationProvidersGet();
}

main().catch(console.error);
