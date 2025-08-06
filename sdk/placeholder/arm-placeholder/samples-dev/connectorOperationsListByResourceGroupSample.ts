// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Connector By ResourceGroup and Subscription
 *
 * @summary list Connector By ResourceGroup and Subscription
 * x-ms-original-file: 2025-08-01-preview/AzureDataExplorerSourceConnector_ListByResourceGroup.json
 */
async function confluentSourceConnectorListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectorOperations.listByResourceGroup(
    "abcd",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await confluentSourceConnectorListByResourceGroup();
}

main().catch(console.error);
