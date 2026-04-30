// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approve or Reject Private Endpoint requests. This call is made by Backup Admin.
 *
 * @summary approve or Reject Private Endpoint requests. This call is made by Backup Admin.
 * x-ms-original-file: 2026-01-01-preview/PrivateEndpointConnection/PutPrivateEndpointConnection.json
 */
async function updatePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.privateEndpointConnection.put(
    "gaallavaultbvtd2msi",
    "gaallaRG",
    "gaallatestpe2.5704c932-249a-490b-a142-1396838cd3b",
    {
      properties: {
        groupIds: ["AzureBackup_secondary"],
        privateEndpoint: {
          id: "/subscriptions/04cf684a-d41f-4550-9f70-7708a3a2283b/resourceGroups/gaallaRG/providers/Microsoft.Network/privateEndpoints/gaallatestpe3",
        },
        privateLinkServiceConnectionState: {
          description: "Approved by johndoe@company.com",
          status: "Approved",
        },
        provisioningState: "Succeeded",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatePrivateEndpointConnection();
}

main().catch(console.error);
