// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to pause one Connector to paused status
 *
 * @summary pause one Connector to paused status
 * x-ms-original-file: 2025-08-01-preview/AzureDataExplorerSourceConnector_Pause.json
 */
async function azureDataExplorerSourceConnectorPause(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  await client.connectorOperations.pause(
    "abcd",
    "AzureDataExploreroSourceConnector1",
  );
}

async function main(): Promise<void> {
  await azureDataExplorerSourceConnectorPause();
}

main().catch(console.error);
