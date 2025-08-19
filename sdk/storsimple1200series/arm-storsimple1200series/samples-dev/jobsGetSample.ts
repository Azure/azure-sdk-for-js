// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the properties of the specified job name.
 *
 * @summary Returns the properties of the specified job name.
 * x-ms-original-file: specification/storsimple1200series/resource-manager/Microsoft.StorSimple/stable/2016-10-01/examples/JobsGet.json
 */

import { StorSimpleManagementClient } from "@azure/arm-storsimple1200series";
import { DefaultAzureCredential } from "@azure/identity";

async function jobsGet(): Promise<void> {
  const subscriptionId = "9eb689cd-7243-43b4-b6f6-5c65cb296641";
  const deviceName = "HSDK-ARCSX4MVKZ";
  const jobName = "06c7ee19-35a2-4248-bf1b-408009b31b63";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "hAzureSDKOperations";
  const credential = new DefaultAzureCredential();
  const client = new StorSimpleManagementClient(credential, subscriptionId);
  const result = await client.jobs.get(deviceName, jobName, resourceGroupName, managerName);
  console.log(result);
}

jobsGet().catch(console.error);
