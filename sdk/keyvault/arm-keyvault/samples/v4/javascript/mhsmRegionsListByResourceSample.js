// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The List operation gets information about the regions associated with the managed HSM Pool.
 *
 * @summary The List operation gets information about the regions associated with the managed HSM Pool.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2025-05-01/examples/ManagedHsm_ListRegionsByResource.json
 */
async function listManagedHsmPoolsInASubscription() {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const name = "sample-mhsm";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mhsmRegions.listByResource(resourceGroupName, name)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listManagedHsmPoolsInASubscription();
}

main().catch(console.error);
