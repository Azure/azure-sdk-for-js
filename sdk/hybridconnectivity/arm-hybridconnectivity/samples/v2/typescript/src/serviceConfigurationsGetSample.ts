// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details about the service to the resource.
 *
 * @summary gets the details about the service to the resource.
 * x-ms-original-file: 2027-01-01/ServiceConfigurations_Get_MaximumSet_Gen.json
 */
async function hybridConnectivityEndpointsServiceconfigurationsGetSSHGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.serviceConfigurations.get(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "qxkrgoqcdbdduowdxphfmfjpe",
    "bdahzuetmihmfsvxrtegqzkybmjbfu",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hybridConnectivityEndpointsServiceconfigurationsGetSSHGeneratedByMaximumSetRule();
}

main().catch(console.error);
