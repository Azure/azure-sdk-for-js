// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Attestation Provider.
 *
 * @summary updates the Attestation Provider.
 * x-ms-original-file: 2021-06-01/Update_AttestationProvider.json
 */
async function attestationProvidersUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.update(
    "MyResourceGroup",
    "myattestationprovider",
    {
      properties: { publicNetworkAccess: "Disabled", tpmAttestationAuthentication: "Disabled" },
      tags: { Property1: "Value1", Property2: "Value2", Property3: "Value3" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await attestationProvidersUpdate();
}

main().catch(console.error);
