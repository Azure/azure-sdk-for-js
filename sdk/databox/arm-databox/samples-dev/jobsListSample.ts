// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the jobs available under the subscription.
 *
 * @summary Lists all the jobs available under the subscription.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsList.json
 */

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function jobsList(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const credential = new DefaultAzureCredential();
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
