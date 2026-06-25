// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a network adapter job.
 *
 * @summary create or update a network adapter job.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineNetworkAdapterJobs_CreateOrUpdate_ApplyConfiguration.json
 */
async function edgeMachineNetworkAdapterJobsCreateOrUpdateApplyConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineNetworkAdapterJobs.createOrUpdate(
    "test-rg",
    "EdgeMachine01",
    "ethernet0",
    "ApplyConfiguration",
    {
      properties: {
        jobType: "ApplyConfiguration",
        deploymentMode: "Deploy",
        targetConfiguration: {
          adapterName: "ethernet0",
          ip4Address: "192.168.1.100",
          subnetMask: "255.255.255.0",
          defaultGateway: "192.168.1.1",
          dnsServers: ["8.8.8.8", "8.8.4.4"],
          ipInterfaceType: "Static",
          vlanId: 100,
          interfaceState: "up",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineNetworkAdapterJobsCreateOrUpdateApplyConfiguration();
}

main().catch(console.error);
