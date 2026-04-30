// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Private Endpoint Connection. This call is made by Backup Admin.
 *
 * @summary get Private Endpoint Connection. This call is made by Backup Admin.
 * x-ms-original-file: 2026-01-01-preview/PrivateEndpointConnection/GetPrivateEndpointConnection.json
 */
async function getPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.privateEndpointConnection.get(
    "gaallavaultbvtd2msi",
    "gaallaRG",
    "gaallatestpe2.5704c932-249a-490b-a142-1396838cd3b",
  );
  console.log(result);
}

async function main() {
  await getPrivateEndpointConnection();
}

main().catch(console.error);
