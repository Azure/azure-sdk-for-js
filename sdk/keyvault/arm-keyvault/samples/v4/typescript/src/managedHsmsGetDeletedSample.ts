// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified deleted managed HSM.
 *
 * @summary gets the specified deleted managed HSM.
 * x-ms-original-file: 2025-05-01/DeletedManagedHsm_Get.json
 */
async function retrieveADeletedManagedHSM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.getDeleted("westus", "hsm1");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveADeletedManagedHSM();
}

main().catch(console.error);
