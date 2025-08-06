// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an Connector instance for the specified subscription, resource group, and instance name.
 *
 * @summary delete an Connector instance for the specified subscription, resource group, and instance name.
 * x-ms-original-file: 2025-08-01-preview/AzureDataExplorerSourceConnector_Delete.json
 */
async function azureDataExplorerSourceConnectorDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  await client.connectorOperations.delete(
    "abcd",
    "AzureDataExploreroSourceConnector1",
  );
}

async function main(): Promise<void> {
  await azureDataExplorerSourceConnectorDelete();
}

main().catch(console.error);
