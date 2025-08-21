// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets the details of the protected item.
 *
 * @summary gets the details of the protected item.
 * x-ms-original-file: 2024-09-01/ProtectedItem_Get.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function getsTheProtectedItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.protectedItem.get("rgrecoveryservicesdatareplication", "4", "d");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheProtectedItem();
}

main().catch(console.error);
