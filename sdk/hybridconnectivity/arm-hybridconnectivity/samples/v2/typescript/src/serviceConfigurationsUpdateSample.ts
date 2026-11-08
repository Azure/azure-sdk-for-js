// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the service details in the service configurations of the target resource.
 *
 * @summary update the service details in the service configurations of the target resource.
 * x-ms-original-file: 2027-01-01/ServiceConfigurations_Update_MaximumSet_Gen.json
 */
async function serviceConfigurationsPatchSSHGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.serviceConfigurations.update(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "bsbpgdlspjhyjgpoxxsoptu",
    "dcdbyycehygofsazwxadc",
    { port: 22 },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serviceConfigurationsPatchSSHGeneratedByMaximumSetRule();
}

main().catch(console.error);
