// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Storage Connector if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource.
 *
 * @summary create a Storage Connector if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource.
 * x-ms-original-file: 2026-04-01/StorageConnectorCRUD/StorageConnectors_Create.json
 */
async function createConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.connectors.create("testrg", "teststorageaccount", "testconnector", {
    location: "eastus",
    properties: {
      state: "Active",
      description: "Example connector",
      dataSourceType: "Azure_DataShare",
      source: {
        type: "DataShare",
        connection: {
          type: "DataShare",
          dataShareUri: "azds://eastus:datashare1:12345678-1234-1234-1234-123456789123",
        },
        authProperties: {
          type: "ManagedIdentity",
          identityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testIdentity",
        },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createConnector();
}

main().catch(console.error);
