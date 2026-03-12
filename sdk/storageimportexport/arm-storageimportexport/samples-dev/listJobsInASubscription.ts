// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Returns all active and completed jobs in a subscription.
 *
 * @summary Returns all active and completed jobs in a subscription.
 * x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListJobsInSubscription.json
 */
import { StorageImportExport } from "@azure/arm-storageimportexport";
import { DefaultAzureCredential } from "@azure/identity";

async function listJobsInASubscription(): Promise<void> {
  const subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const credential = new DefaultAzureCredential();
  const client = new StorageImportExport(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listJobsInASubscription().catch(console.error);
