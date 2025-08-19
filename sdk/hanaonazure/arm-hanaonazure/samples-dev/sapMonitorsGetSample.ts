// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HanaManagementClient } from "@azure/arm-hanaonazure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets properties of a SAP monitor for the specified subscription, resource group, and resource name.
 *
 * @summary Gets properties of a SAP monitor for the specified subscription, resource group, and resource name.
 * x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/SapMonitors_Get.json
 */
async function getPropertiesOfASapMonitor(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const sapMonitorName = "mySapMonitor";
  const credential = new DefaultAzureCredential();
  const client = new HanaManagementClient(credential, subscriptionId);
  const result = await client.sapMonitors.get(resourceGroupName, sapMonitorName);
  console.log(result);
}

getPropertiesOfASapMonitor().catch(console.error);
