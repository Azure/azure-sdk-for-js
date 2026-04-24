// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a list of Secondary Recovery Points for a DataSource in a vault, that can be used for Cross Region Restore.
 *
 * @summary returns a list of Secondary Recovery Points for a DataSource in a vault, that can be used for Cross Region Restore.
 * x-ms-original-file: 2025-07-01/CrossRegionRestore/FetchSecondaryRPs.json
 */
async function fetchSecondaryRPs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fetchSecondaryRecoveryPoints.list(
    "000pikumar",
    "WestUS",
    {
      sourceBackupInstanceId:
        "/subscriptions/04cf684a-d41f-4550-9f70-7708a3a2283b/resourceGroups/HelloTest/providers/Microsoft.DataProtection/backupVaults/HelloTestVault/backupInstances/653213d-c5b3-44f6-a0d9-db3c4f9d8e34",
      sourceRegion: "EastUS",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fetchSecondaryRPs();
}

main().catch(console.error);
