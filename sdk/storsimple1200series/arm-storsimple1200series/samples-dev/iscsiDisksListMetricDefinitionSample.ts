// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves metric definitions for all metric aggregated at the iSCSI disk.
 *
 * @summary Retrieves metric definitions for all metric aggregated at the iSCSI disk.
 * x-ms-original-file: specification/storsimple1200series/resource-manager/Microsoft.StorSimple/stable/2016-10-01/examples/IscsiDisksListMetricDefinition.json
 */

import { StorSimpleManagementClient } from "@azure/arm-storsimple1200series";
import { DefaultAzureCredential } from "@azure/identity";

async function iscsiDisksListMetricDefinition(): Promise<void> {
  const subscriptionId = "9eb689cd-7243-43b4-b6f6-5c65cb296641";
  const deviceName = "HSDK-WSJQERQW3F";
  const iscsiServerName = "HSDK-WSJQERQW3F";
  const diskName = "TieredIscsiDiskForSDKTest";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "hAzureSDKOperations";
  const credential = new DefaultAzureCredential();
  const client = new StorSimpleManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iscsiDisks.listMetricDefinition(
    deviceName,
    iscsiServerName,
    diskName,
    resourceGroupName,
    managerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

iscsiDisksListMetricDefinition().catch(console.error);
