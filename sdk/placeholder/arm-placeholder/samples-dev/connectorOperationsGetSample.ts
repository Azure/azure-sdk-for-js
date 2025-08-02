// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Connector instance for the specified subscription, resource group, and instance name.
 *
 * @summary gets an Connector instance for the specified subscription, resource group, and instance name.
 * x-ms-original-file: 2025-08-01-preview/AzureDataExplorerSourceConnector_Get.json
 */
async function azureDataExplorerSourceConnectorGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  const result = await client.connectorOperations.get(
    "abcd",
    "AzureDataExplorerSourceConnector1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureDataExplorerSourceConnectorGet();
}

main().catch(console.error);
