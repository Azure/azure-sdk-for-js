// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resume one Connector to running status
 *
 * @summary resume one Connector to running status
 * x-ms-original-file: 2025-08-01-preview/AzureDataExplorerSourceConnector_Resume.json
 */
async function azureDataExplorerSourceConnectorResume(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  await client.connectorOperations.resume(
    "abcd",
    "AzureDataExplorerSourceConnector1",
  );
}

async function main(): Promise<void> {
  await azureDataExplorerSourceConnectorResume();
}

main().catch(console.error);
