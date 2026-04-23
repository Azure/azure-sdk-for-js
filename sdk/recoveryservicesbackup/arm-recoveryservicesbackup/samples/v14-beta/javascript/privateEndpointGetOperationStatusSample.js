// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the operation status for a private endpoint connection.
 *
 * @summary gets the operation status for a private endpoint connection.
 * x-ms-original-file: 2026-01-01-preview/PrivateEndpointConnection/GetPrivateEndpointConnectionOperationStatus.json
 */
async function getOperationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.privateEndpoint.getOperationStatus(
    "gaallavaultbvtd2msi",
    "gaallaRG",
    "gaallatestpe2.5704c932-249a-490b-a142-1396838cd3b",
    "0f48183b-0a44-4dca-aec1-bba5daab888a",
  );
  console.log(result);
}

async function main() {
  await getOperationStatus();
}

main().catch(console.error);
