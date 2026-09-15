// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the service details to the target resource.
 *
 * @summary deletes the service details to the target resource.
 * x-ms-original-file: 2027-01-01/ServiceConfigurations_Delete_MaximumSet_Gen.json
 */
async function serviceConfigurationsDeleteSSHGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  await client.serviceConfigurations.delete(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "ureaofizl",
    "ptkmrkoxmvcmvhdzxkd",
  );
}

/**
 * This sample demonstrates how to deletes the service details to the target resource.
 *
 * @summary deletes the service details to the target resource.
 * x-ms-original-file: 2027-01-01/ServiceConfigurations_Delete_MinimumSet_Gen.json
 */
async function serviceConfigurationsDeleteSSHGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  await client.serviceConfigurations.delete(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "ykrzxbnhnszoikyge",
    "qwaxkaulnvwsspqjblxrlxtlyfr",
  );
}

async function main() {
  await serviceConfigurationsDeleteSSHGeneratedByMaximumSetRule();
  await serviceConfigurationsDeleteSSHGeneratedByMinimumSetRule();
}

main().catch(console.error);
