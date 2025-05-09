/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { BackupsListByDeviceOptionalParams } from "@azure/arm-storsimple8000series";
import { StorSimple8000SeriesManagementClient } from "@azure/arm-storsimple8000series";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Retrieves all the backups in a device.
 *
 * @summary Retrieves all the backups in a device.
 * x-ms-original-file: specification/storsimple8000series/resource-manager/Microsoft.StorSimple/stable/2017-06-01/examples/BackupsListByDevice.json
 */
async function backupsListByDevice(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "Device05ForSDKTest";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "ManagerForSDKTest1";
  const filter =
    "createdTime%20ge%20'2017-06-22T18:30:00Z'%20and%20backupPolicyId%20eq%20'%2Fsubscriptions%2F4385cf00-2d3a-425a-832f-f4285b1c9dce%2FresourceGroups%2FResourceGroupForSDKTest%2Fproviders%2FMicrosoft.StorSimple%2Fmanagers%2FManagerForSDKTest1%2Fdevices%2FDevice05ForSDKTest%2FbackupPolicies%2FBkUpPolicy01ForSDKTest'";
  const options: BackupsListByDeviceOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new StorSimple8000SeriesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backups.listByDevice(
    deviceName,
    resourceGroupName,
    managerName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

backupsListByDevice().catch(console.error);
