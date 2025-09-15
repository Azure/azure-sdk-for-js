// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets the location based operation result.
 *
 * @summary gets the location based operation result.
 * x-ms-original-file: 2024-09-01/LocationBasedOperationResults_Get.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function getsTheLocationBasedOperationResultStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.locationBasedOperationResults.get(
    "rgswagger_2024-09-01",
    "Central US EUAP",
    "lghle",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheLocationBasedOperationResultStatus();
}

main().catch(console.error);
