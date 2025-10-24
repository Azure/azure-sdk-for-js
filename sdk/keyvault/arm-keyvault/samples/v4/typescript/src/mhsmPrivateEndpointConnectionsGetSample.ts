// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the managed HSM Pool.
 *
 * @summary gets the specified private endpoint connection associated with the managed HSM Pool.
 * x-ms-original-file: 2025-05-01/ManagedHsm_getPrivateEndpointConnection.json
 */
async function managedHsmGetPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.mhsmPrivateEndpointConnections.get(
    "sample-group",
    "sample-mhsm",
    "sample-pec",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedHsmGetPrivateEndpointConnection();
}

main().catch(console.error);
