// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to removes the protected item.
 *
 * @summary removes the protected item.
 * x-ms-original-file: 2024-09-01/ProtectedItem_Delete.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function deletesTheProtectedItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.protectedItem.delete("rgrecoveryservicesdatareplication", "4", "d", {
    forceDelete: true,
  });
}

async function main(): Promise<void> {
  await deletesTheProtectedItem();
}

main().catch(console.error);
