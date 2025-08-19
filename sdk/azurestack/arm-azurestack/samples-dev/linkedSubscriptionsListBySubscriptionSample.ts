// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a list of all linked subscriptions under current subscription.
 *
 * @summary Returns a list of all linked subscriptions under current subscription.
 * x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/LinkedSubscription/ListBySubscription.json
 */

import { AzureStackManagementClient } from "@azure/arm-azurestack";
import { DefaultAzureCredential } from "@azure/identity";

async function returnsAListOfAllLinkedSubscriptions(): Promise<void> {
  const subscriptionId = "dd8597b4-8739-4467-8b10-f8679f62bfbf";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.linkedSubscriptions.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

returnsAListOfAllLinkedSubscriptions().catch(console.error);
