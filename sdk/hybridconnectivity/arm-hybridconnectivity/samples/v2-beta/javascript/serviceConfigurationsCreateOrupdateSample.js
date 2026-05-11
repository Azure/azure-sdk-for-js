// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a service in serviceConfiguration for the endpoint resource.
 *
 * @summary create or update a service in serviceConfiguration for the endpoint resource.
 * x-ms-original-file: 2024-12-01/ServiceConfigurationsPutSSH.json
 */
async function serviceConfigurationsPutSSH() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.serviceConfigurations.createOrupdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine/providers/Microsoft.HybridConnectivity/endpoints/default",
    "default",
    "SSH",
    { port: 22, serviceName: "SSH" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a service in serviceConfiguration for the endpoint resource.
 *
 * @summary create or update a service in serviceConfiguration for the endpoint resource.
 * x-ms-original-file: 2024-12-01/ServiceConfigurationsPutWAC.json
 */
async function serviceConfigurationsPutWAC() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.serviceConfigurations.createOrupdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine/providers/Microsoft.HybridConnectivity/endpoints/default",
    "default",
    "WAC",
    { port: 6516, serviceName: "WAC" },
  );
  console.log(result);
}

async function main() {
  await serviceConfigurationsPutSSH();
  await serviceConfigurationsPutWAC();
}

main().catch(console.error);
