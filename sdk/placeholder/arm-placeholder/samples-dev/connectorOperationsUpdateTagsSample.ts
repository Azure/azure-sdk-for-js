// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Tags of Connector
 *
 * @summary update Tags of Connector
 * x-ms-original-file: 2025-08-01-preview/AzureDataExplorerSourceConnector_UpdateTags.json
 */
async function azureDataExplorerSourceConnectorUpdateTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  const result = await client.connectorOperations.updateTags(
    "abcd",
    "AzureDataExplorerSourceConnector1",
    { tags: { tag1: "value1", tag2: "value2", tag3: "value3" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureDataExplorerSourceConnectorUpdateTags();
}

main().catch(console.error);
