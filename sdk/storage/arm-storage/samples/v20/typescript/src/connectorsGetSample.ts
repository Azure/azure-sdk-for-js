// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified Storage Connector.
 *
 * @summary get the specified Storage Connector.
 * x-ms-original-file: 2026-04-01/StorageConnectorCRUD/StorageConnectors_Get.json
 */
async function getConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.connectors.get("testrg", "teststorageaccount", "testconnector");
  console.log(result);
}

async function main(): Promise<void> {
  await getConnector();
}

main().catch(console.error);
