// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the result of async operation for tiering cost
 *
 * @summary Gets the result of async operation for tiering cost
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/TieringCost/GetTieringCostOperationResult.json
 */
async function fetchTieringCostOperationResult(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "gaallaRG";
  const vaultName = "gaallavaultbvtd2msi";
  const operationId = "0f48183b-0a44-4dca-aec1-bba5daab888a";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.getTieringCostOperationResult.get(
    resourceGroupName,
    vaultName,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await fetchTieringCostOperationResult();
}

main().catch(console.error);
