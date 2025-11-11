// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a dryrun job
 *
 * @summary delete a dryrun job
 * x-ms-original-file: 2024-07-01-preview/ConnectorDryrunDelete.json
 */
async function connectorDryrunDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  await client.connector.deleteDryrun("test-rg", "westus", "dryrunName");
}

async function main(): Promise<void> {
  await connectorDryrunDelete();
}

main().catch(console.error);
