// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List operation gets information about the regions associated with the managed HSM Pool.
 *
 * @summary the List operation gets information about the regions associated with the managed HSM Pool.
 * x-ms-original-file: 2025-05-01/ManagedHsm_ListRegionsByResource.json
 */
async function listManagedHSMPoolsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mhsmRegions.listByResource("sample-group", "sample-mhsm")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedHSMPoolsInASubscription();
}

main().catch(console.error);
