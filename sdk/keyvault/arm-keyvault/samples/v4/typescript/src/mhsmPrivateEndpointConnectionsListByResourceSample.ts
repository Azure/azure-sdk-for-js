// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the List operation gets information about the private endpoint connections associated with the managed HSM Pool.
 *
 * @summary the List operation gets information about the private endpoint connections associated with the managed HSM Pool.
 * x-ms-original-file: 2025-05-01/ManagedHsm_ListPrivateEndpointConnectionsByResource.json
 */
async function listManagedHSMPoolsInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mhsmPrivateEndpointConnections.listByResource(
    "sample-group",
    "sample-mhsm",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedHSMPoolsInASubscription();
}

main().catch(console.error);
