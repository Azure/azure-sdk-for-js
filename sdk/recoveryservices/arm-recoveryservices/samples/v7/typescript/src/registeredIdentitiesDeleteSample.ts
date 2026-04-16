// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to unregisters the given container from your Recovery Services vault.
 *
 * @summary unregisters the given container from your Recovery Services vault.
 * x-ms-original-file: 2025-08-01/DeleteRegisteredIdentities.json
 */
async function deleteRegisteredIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-d41f-4550-9f70-7708a3a2283b";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  await client.registeredIdentities.delete("BCDRIbzRG", "BCDRIbzVault", "dpmcontainer01");
}

async function main(): Promise<void> {
  await deleteRegisteredIdentity();
}

main().catch(console.error);
