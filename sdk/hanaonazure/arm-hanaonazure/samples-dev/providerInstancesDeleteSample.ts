// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a provider instance for the specified subscription, resource group, SapMonitor name, and resource name.
 *
 * @summary Deletes a provider instance for the specified subscription, resource group, SapMonitor name, and resource name.
 * x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/ProviderInstances_Delete.json
 */

import { HanaManagementClient } from "@azure/arm-hanaonazure";
import { DefaultAzureCredential } from "@azure/identity";

async function deletesASapMonitor(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const sapMonitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const credential = new DefaultAzureCredential();
  const client = new HanaManagementClient(credential, subscriptionId);
  const result = await client.providerInstances.beginDeleteAndWait(
    resourceGroupName,
    sapMonitorName,
    providerInstanceName,
  );
  console.log(result);
}

deletesASapMonitor().catch(console.error);
