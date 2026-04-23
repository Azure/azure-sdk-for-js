// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Private Endpoint requests. This call is made by Backup Admin.
 *
 * @summary delete Private Endpoint requests. This call is made by Backup Admin.
 * x-ms-original-file: 2026-01-01-preview/PrivateEndpointConnection/DeletePrivateEndpointConnection.json
 */
async function deletePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.privateEndpointConnection.delete(
    "gaallavaultbvtd2msi",
    "gaallaRG",
    "gaallatestpe2.5704c932-249a-490b-a142-1396838cd3b",
  );
}

async function main(): Promise<void> {
  await deletePrivateEndpointConnection();
}

main().catch(console.error);
