// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a service in serviceConfiguration for the endpoint resource.
 *
 * @summary create or update a service in serviceConfiguration for the endpoint resource.
 * x-ms-original-file: 2027-01-01/ServiceConfigurations_CreateOrupdate_MaximumSet_Gen.json
 */
async function serviceConfigurationsPutSSHGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.serviceConfigurations.createOrupdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "djevinbielhfx",
    "inlnklujw",
    {
      port: 22,
      serviceName: "SSH",
      resourceId:
        "/subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serviceConfigurationsPutSSHGeneratedByMaximumSetRule();
}

main().catch(console.error);
