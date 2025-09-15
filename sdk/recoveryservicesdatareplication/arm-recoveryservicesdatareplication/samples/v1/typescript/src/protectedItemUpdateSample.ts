// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to performs update on the protected item.
 *
 * @summary performs update on the protected item.
 * x-ms-original-file: 2024-09-01/ProtectedItem_Update.json
 */
async function updateProtectedItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.protectedItem.update("rgswagger_2024-09-01", "4", "d", {
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateProtectedItem();
}

main().catch(console.error);
