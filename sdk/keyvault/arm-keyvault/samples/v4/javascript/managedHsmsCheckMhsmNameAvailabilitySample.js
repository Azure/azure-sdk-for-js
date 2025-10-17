// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the managed hsm name is valid and is not already in use.
 *
 * @summary checks that the managed hsm name is valid and is not already in use.
 * x-ms-original-file: 2025-05-01/ManagedHsm_checkMhsmNameAvailability.json
 */
async function validateAManagedHsmName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.checkMhsmNameAvailability({
    name: "sample-mhsm",
  });
  console.log(result);
}

async function main() {
  await validateAManagedHsmName();
}

main().catch(console.error);
