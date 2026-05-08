// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Storage Connector.
 *
 * @summary update a Storage Connector.
 * x-ms-original-file: 2025-08-01/StorageConnectorCRUD/StorageConnectors_Update.json
 */
async function updateConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.connectors.update("testrg", "teststorageaccount", "testconnector", {
    properties: {
      source: {
        authProperties: {
          identityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/newTestIdentity",
        },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateConnector();
}

main().catch(console.error);
