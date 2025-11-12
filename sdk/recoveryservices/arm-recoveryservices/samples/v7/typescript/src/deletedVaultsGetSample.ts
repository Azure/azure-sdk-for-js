// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific deleted vault.
 *
 * @summary get a specific deleted vault.
 * x-ms-original-file: 2025-08-01/DeletedVaults_Get.json
 */
async function getsDeletedVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.deletedVaults.get("westus", "swaggerExample");
  console.log(result);
}

async function main(): Promise<void> {
  await getsDeletedVault();
}

main().catch(console.error);
