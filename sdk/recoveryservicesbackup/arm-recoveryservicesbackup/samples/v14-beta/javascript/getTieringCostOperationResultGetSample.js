// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the result of async operation for tiering cost
 *
 * @summary gets the result of async operation for tiering cost
 * x-ms-original-file: 2026-01-01-preview/TieringCost/GetTieringCostOperationResult.json
 */
async function fetchTieringCostOperationResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.getTieringCostOperationResult.get(
    "gaallaRG",
    "gaallavaultbvtd2msi",
    "0f48183b-0a44-4dca-aec1-bba5daab888a",
  );
  console.log(result);
}

async function main() {
  await fetchTieringCostOperationResult();
}

main().catch(console.error);
