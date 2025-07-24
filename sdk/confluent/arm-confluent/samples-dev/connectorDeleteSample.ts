// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete confluent connector by name
 *
 * @summary delete confluent connector by name
 * x-ms-original-file: 2024-07-01/Organization_DeleteConnectorByName.json
 */
async function connectorDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.connector.delete(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "dlz-f3a90de",
    "connector-1",
  );
}

async function main(): Promise<void> {
  await connectorDelete();
}

main().catch(console.error);
