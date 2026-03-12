// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates the extended info of the manager.
 *
 * @summary Creates the extended info of the manager.
 * x-ms-original-file: specification/storsimple8000series/resource-manager/Microsoft.StorSimple/stable/2017-06-01/examples/ManagersCreateExtendedInfo.json
 */

import type { ManagerExtendedInfo } from "@azure/arm-storsimple8000series";
import { StorSimple8000SeriesManagementClient } from "@azure/arm-storsimple8000series";
import { DefaultAzureCredential } from "@azure/identity";

async function managersCreateExtendedInfo(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "ManagerForSDKTest2";
  const parameters: ManagerExtendedInfo = {
    algorithm: "None",
    integrityKey: "BIl+RHqO8PZ6DRvuXTTK7g==",
  };
  const credential = new DefaultAzureCredential();
  const client = new StorSimple8000SeriesManagementClient(credential, subscriptionId);
  const result = await client.managers.createExtendedInfo(
    resourceGroupName,
    managerName,
    parameters,
  );
  console.log(result);
}

managersCreateExtendedInfo().catch(console.error);
