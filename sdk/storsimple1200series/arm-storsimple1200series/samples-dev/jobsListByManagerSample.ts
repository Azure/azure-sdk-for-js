// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves all the jobs in a manager.
 *
 * @summary Retrieves all the jobs in a manager.
 * x-ms-original-file: specification/storsimple1200series/resource-manager/Microsoft.StorSimple/stable/2016-10-01/examples/JobsListByManager.json
 */

import type { JobsListByManagerOptionalParams } from "@azure/arm-storsimple1200series";
import { StorSimpleManagementClient } from "@azure/arm-storsimple1200series";
import { DefaultAzureCredential } from "@azure/identity";

async function jobsListByManager(): Promise<void> {
  const subscriptionId = "9eb689cd-7243-43b4-b6f6-5c65cb296641";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "hAzureSDKOperations";
  const filter = "jobType%20eq%20'Backup'";
  const options: JobsListByManagerOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new StorSimpleManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.listByManager(resourceGroupName, managerName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

jobsListByManager().catch(console.error);
