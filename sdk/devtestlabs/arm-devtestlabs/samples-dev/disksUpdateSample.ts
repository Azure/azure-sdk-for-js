// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Allows modifying tags of disks. All other properties will be ignored.
 *
 * @summary Allows modifying tags of disks. All other properties will be ignored.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Disks_Update.json
 */

import type { DiskFragment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function disksUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "@me";
  const name = "diskName";
  const disk: DiskFragment = { tags: { tagName1: "tagValue1" } };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.disks.update(resourceGroupName, labName, userName, name, disk);
  console.log(result);
}

disksUpdate().catch(console.error);
