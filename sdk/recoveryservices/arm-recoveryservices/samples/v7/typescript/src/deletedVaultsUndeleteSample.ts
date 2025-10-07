// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to start undelete of a deleted vault.
 *
 * @summary start undelete of a deleted vault.
 * x-ms-original-file: 2025-08-01/DeletedVaults_Undelete.json
 */
async function undeleteADeletedVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  await client.deletedVaults.undelete("westus", "swaggerExample", {
    properties: {
      recoveryResourceGroupId:
        "/subscriptions/77777777-b0c6-47a2-b37c-d8e65a629c18/resourceGroups/Default-RecoveryServices-ResourceGroup",
    },
  });
}

async function main(): Promise<void> {
  await undeleteADeletedVault();
}

main().catch(console.error);
