// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the jobs available under the subscription.
 *
 * @summary lists all the jobs available under the subscription.
 * x-ms-original-file: 2025-07-01/JobsList.json
 */
async function jobsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await jobsList();
}

main().catch(console.error);
