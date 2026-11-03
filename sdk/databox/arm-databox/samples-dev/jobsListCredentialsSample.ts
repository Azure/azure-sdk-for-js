// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this method gets the unencrypted secrets related to the job.
 *
 * @summary this method gets the unencrypted secrets related to the job.
 * x-ms-original-file: 2025-07-01/JobsListCredentials.json
 */
async function jobsListCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.listCredentials("YourResourceGroupName", "TestJobName1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await jobsListCredentials();
}

main().catch(console.error);
