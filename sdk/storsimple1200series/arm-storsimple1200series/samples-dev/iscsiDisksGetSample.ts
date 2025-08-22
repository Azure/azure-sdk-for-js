// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the properties of the specified iSCSI disk name.
 *
 * @summary Returns the properties of the specified iSCSI disk name.
 * x-ms-original-file: specification/storsimple1200series/resource-manager/Microsoft.StorSimple/stable/2016-10-01/examples/IscsiDisksGet.json
 */

import { StorSimpleManagementClient } from "@azure/arm-storsimple1200series";
import { DefaultAzureCredential } from "@azure/identity";

async function iscsiDisksGet(): Promise<void> {
  const subscriptionId = "9eb689cd-7243-43b4-b6f6-5c65cb296641";
  const deviceName = "HSDK-0NZI14MDTF";
  const iscsiServerName = "HSDK-0NZI14MDTF";
  const diskName = "Auto-TestIscsiDisk1";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "hAzureSDKOperations";
  const credential = new DefaultAzureCredential();
  const client = new StorSimpleManagementClient(credential, subscriptionId);
  const result = await client.iscsiDisks.get(
    deviceName,
    iscsiServerName,
    diskName,
    resourceGroupName,
    managerName,
  );
  console.log(result);
}

iscsiDisksGet().catch(console.error);
