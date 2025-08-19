// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to List labs in a subscription.
 *
 * @summary List labs in a subscription.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Labs_ListBySubscription.json
 */
async function labsListBySubscription(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.labs.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

labsListBySubscription().catch(console.error);
