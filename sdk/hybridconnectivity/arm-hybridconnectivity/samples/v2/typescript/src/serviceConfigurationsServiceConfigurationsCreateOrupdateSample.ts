// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI, ServiceConfigurationResource } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a service in serviceConfiguration for the endpoint resource.
 *
 * @summary create or update a service in serviceConfiguration for the endpoint resource.
 * x-ms-original-file: 2024-12-01/ServiceConfigurationsPutSSH.json
 */
async function serviceConfigurationsPutSSH(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const serviceConfigurationResourceProperties: ServiceConfigurationResource = {
    properties: {
      port: 22,
      serviceName: "SSH"
    }
  }
  const result = await client.serviceConfigurations.createOrupdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine/providers/Microsoft.HybridConnectivity/endpoints/default",
    "default",
    "SSH",
    serviceConfigurationResourceProperties
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a service in serviceConfiguration for the endpoint resource.
 *
 * @summary create or update a service in serviceConfiguration for the endpoint resource.
 * x-ms-original-file: 2024-12-01/ServiceConfigurationsPutWAC.json
 */
async function serviceConfigurationsPutWAC(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const serviceConfigurationResourceProperties: ServiceConfigurationResource = {
    properties: {
      port: 6516,
      serviceName: "WAC"
    }
  }
  const result = await client.serviceConfigurations.createOrupdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine/providers/Microsoft.HybridConnectivity/endpoints/default",
    "default",
    "WAC",
    serviceConfigurationResourceProperties
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serviceConfigurationsPutSSH();
  await serviceConfigurationsPutWAC();
}

main().catch(console.error);
