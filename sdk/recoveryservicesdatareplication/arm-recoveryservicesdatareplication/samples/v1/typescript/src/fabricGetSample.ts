// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the fabric.
 *
 * @summary gets the details of the fabric.
 * x-ms-original-file: 2024-09-01/Fabric_Get.json
 */
async function getsTheFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabric.get("rgrecoveryservicesdatareplication", "wPR");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheFabric();
}

main().catch(console.error);
