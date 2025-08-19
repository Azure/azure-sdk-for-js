// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderInstance } from "@azure/arm-hanaonazure";
import { HanaManagementClient } from "@azure/arm-hanaonazure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SapMonitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SapMonitor name, and resource name.
 * x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/ProviderInstances_Create.json
 */
async function createASapMonitor(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const sapMonitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    typePropertiesType: "hana",
    metadata: '{"key":"value"}',
    properties:
      '{"hostname":"10.0.0.6","dbName":"SYSTEMDB","sqlPort":30013,"dbUsername":"SYSTEM","dbPassword":"PASSWORD"}',
  };
  const credential = new DefaultAzureCredential();
  const client = new HanaManagementClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    sapMonitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

createASapMonitor().catch(console.error);
