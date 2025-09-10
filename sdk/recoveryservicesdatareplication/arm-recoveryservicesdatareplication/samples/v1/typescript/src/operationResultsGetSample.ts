// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the operations.
 *
 * @summary gets the operations.
 * x-ms-original-file: 2024-09-01/OperationResults_Get.json
 */
async function getsTheOperationResults(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.operationResults.get("rgswagger_2024-09-01", "lghle");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheOperationResults();
}

main().catch(console.error);
