// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List operation gets information about the managed HSM Pools associated with the subscription and within the specified resource group.
 *
 * @summary the List operation gets information about the managed HSM Pools associated with the subscription and within the specified resource group.
 * x-ms-original-file: 2025-05-01/ManagedHsm_ListByResourceGroup.json
 */
async function listManagedHSMPoolsInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedHsms.listByResourceGroup("hsm-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedHSMPoolsInAResourceGroup();
}

main().catch(console.error);
