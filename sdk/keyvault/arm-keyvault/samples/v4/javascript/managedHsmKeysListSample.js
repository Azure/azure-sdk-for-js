// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the keys in the specified managed HSM.
 *
 * @summary lists the keys in the specified managed HSM.
 * x-ms-original-file: 2025-05-01/managedHsmListKeys.json
 */
async function listKeysInTheManagedHSM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedHsmKeys.list("sample-group", "sample-managedhsm-name")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listKeysInTheManagedHSM();
}

main().catch(console.error);
