// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves all the bandwidth setting in a manager.
 *
 * @summary Retrieves all the bandwidth setting in a manager.
 * x-ms-original-file: specification/storsimple8000series/resource-manager/Microsoft.StorSimple/stable/2017-06-01/examples/BandwidthSettingsListByManager.json
 */

import { StorSimple8000SeriesManagementClient } from "@azure/arm-storsimple8000series";
import { DefaultAzureCredential } from "@azure/identity";

async function bandwidthSettingsListByManager(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "ManagerForSDKTest1";
  const credential = new DefaultAzureCredential();
  const client = new StorSimple8000SeriesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bandwidthSettings.listByManager(resourceGroupName, managerName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

bandwidthSettingsListByManager().catch(console.error);
