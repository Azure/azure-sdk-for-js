// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List schedules in a subscription.
 *
 * @summary List schedules in a subscription.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/GlobalSchedules_ListBySubscription.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function globalSchedulesListBySubscription(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.globalSchedules.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

globalSchedulesListBySubscription().catch(console.error);
