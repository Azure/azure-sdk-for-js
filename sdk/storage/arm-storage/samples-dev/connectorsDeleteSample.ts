// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Storage Connector.
 *
 * @summary delete a Storage Connector.
 * x-ms-original-file: 2026-04-01/StorageConnectorCRUD/StorageConnectors_Delete.json
 */
async function deleteConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.connectors.delete("testrg", "teststorageaccount", "testconnector");
}

async function main(): Promise<void> {
  await deleteConnector();
}

main().catch(console.error);
