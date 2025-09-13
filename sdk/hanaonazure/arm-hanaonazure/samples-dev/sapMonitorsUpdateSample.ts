// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Patches the Tags field of a SAP monitor for the specified subscription, resource group, and monitor name.
 *
 * @summary Patches the Tags field of a SAP monitor for the specified subscription, resource group, and monitor name.
 * x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/SapMonitors_PatchTags_Delete.json
 */

import type { Tags } from "@azure/arm-hanaonazure";
import { HanaManagementClient } from "@azure/arm-hanaonazure";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteTagsFieldOfASapMonitor(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const sapMonitorName = "mySapMonitor";
  const tagsParameter: Tags = { tags: {} };
  const credential = new DefaultAzureCredential();
  const client = new HanaManagementClient(credential, subscriptionId);
  const result = await client.sapMonitors.update(resourceGroupName, sapMonitorName, tagsParameter);
  console.log(result);
}

deleteTagsFieldOfASapMonitor().catch(console.error);

/**
 * This sample demonstrates how to Patches the Tags field of a SAP monitor for the specified subscription, resource group, and monitor name.
 *
 * @summary Patches the Tags field of a SAP monitor for the specified subscription, resource group, and monitor name.
 * x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/SapMonitors_PatchTags.json
 */
async function updateTagsFieldOfASapMonitor(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const sapMonitorName = "mySapMonitor";
  const tagsParameter: Tags = { tags: { testkey: "testvalue" } };
  const credential = new DefaultAzureCredential();
  const client = new HanaManagementClient(credential, subscriptionId);
  const result = await client.sapMonitors.update(resourceGroupName, sapMonitorName, tagsParameter);
  console.log(result);
}

updateTagsFieldOfASapMonitor().catch(console.error);
