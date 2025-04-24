// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details about the service to the resource.
 *
 * @summary gets the details about the service to the resource.
 * x-ms-original-file: 2024-12-01/ServiceConfigurationsGetSSH.json
 */
async function hybridConnectivityEndpointsServiceconfigurationsGetSSH(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.serviceConfigurations.get(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine/providers/Microsoft.HybridConnectivity/endpoints/default",
    "default",
    "SSH",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the details about the service to the resource.
 *
 * @summary gets the details about the service to the resource.
 * x-ms-original-file: 2024-12-01/ServiceConfigurationsGetWAC.json
 */
async function hybridConnectivityEndpointsServiceconfigurationsGetWAC(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.serviceConfigurations.get(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine/providers/Microsoft.HybridConnectivity/endpoints/default",
    "default",
    "WAC",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hybridConnectivityEndpointsServiceconfigurationsGetSSH();
  await hybridConnectivityEndpointsServiceconfigurationsGetWAC();
}

main().catch(console.error);
