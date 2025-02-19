// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the service details to the target resource.
 *
 * @summary deletes the service details to the target resource.
 * x-ms-original-file: 2024-12-01/ServiceConfigurationsDeleteSSH.json
 */
async function serviceConfigurationsDeleteSSH(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  await client.serviceConfigurations.ServiceConfigurations_delete(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine/providers/Microsoft.HybridConnectivity/endpoints/default",
    "default",
    "SSH",
  );
}

async function main(): Promise<void> {
  await serviceConfigurationsDeleteSSH();
}

main().catch(console.error);
