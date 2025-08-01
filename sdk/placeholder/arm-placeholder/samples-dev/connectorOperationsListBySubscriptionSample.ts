// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Connector By Subscription
 *
 * @summary list Connector By Subscription
 * x-ms-original-file: 2025-08-01-preview/AzureDataExplorerSourceConnector_ListBySubscription.json
 */
async function confluentSourceConnectorListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectorOperations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await confluentSourceConnectorListBySubscription();
}

main().catch(console.error);
