// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Scans for updates on the device.
 *
 * @summary Scans for updates on the device.
 * x-ms-original-file: specification/storsimple1200series/resource-manager/Microsoft.StorSimple/stable/2016-10-01/examples/DevicesScanForUpdates.json
 */

import { StorSimpleManagementClient } from "@azure/arm-storsimple1200series";
import { DefaultAzureCredential } from "@azure/identity";

async function devicesScanForUpdates(): Promise<void> {
  const subscriptionId = "9eb689cd-7243-43b4-b6f6-5c65cb296641";
  const deviceName = "HBVT-02X525X2W0";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "hManagerForSDKTest4";
  const credential = new DefaultAzureCredential();
  const client = new StorSimpleManagementClient(credential, subscriptionId);
  const result = await client.devices.beginScanForUpdatesAndWait(
    deviceName,
    resourceGroupName,
    managerName,
  );
  console.log(result);
}

devicesScanForUpdates().catch(console.error);
