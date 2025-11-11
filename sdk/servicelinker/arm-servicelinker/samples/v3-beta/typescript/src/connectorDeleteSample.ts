// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Connector.
 *
 * @summary delete a Connector.
 * x-ms-original-file: 2024-07-01-preview/DeleteConnector.json
 */
async function deleteConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  await client.connector.delete("test-rg", "westus", "connectorName");
}

async function main(): Promise<void> {
  await deleteConnector();
}

main().catch(console.error);
