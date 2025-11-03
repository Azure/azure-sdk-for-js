// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List operation gets information about the deleted managed HSMs associated with the subscription.
 *
 * @summary the List operation gets information about the deleted managed HSMs associated with the subscription.
 * x-ms-original-file: 2025-05-01/DeletedManagedHsm_List.json
 */
async function listDeletedManagedHSMsInTheSpecifiedSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedHsms.listDeleted()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeletedManagedHSMsInTheSpecifiedSubscription();
}

main().catch(console.error);
