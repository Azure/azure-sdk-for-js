// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of async operations of tiering cost
 *
 * @summary gets the status of async operations of tiering cost
 * x-ms-original-file: 2026-01-01-preview/TieringCost/GetTieringCostOperationStatus.json
 */
async function fetchTieringCostOperationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.tieringCostOperationStatus.get(
    "gaallaRG",
    "gaallavaultbvtd2msi",
    "0f48183b-0a44-4dca-aec1-bba5daab888a",
  );
  console.log(result);
}

async function main() {
  await fetchTieringCostOperationStatus();
}

main().catch(console.error);
