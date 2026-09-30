// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates BulkCreates.
 *
 * @summary creates or updates BulkCreates.
 * x-ms-original-file: 2026-09-06-preview/BulkCreate_CreateOrUpdate_MaximumSet_Gen.json
 */
async function bulkCreateCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreate.createOrUpdate(
    "rgBulkactions",
    "eastus",
    "89f31926-145c-410c-a56a-5bc97359274c",
    {
      properties: {
        capacity: 2,
        capacityType: "VM",
        minCapacity: 1,
        partialFulfillmentPolicy: { mode: "Enabled" },
        priorityProfile: {
          type: "Spot",
          maxPricePerVM: 0.2,
          evictionPolicy: "Delete",
          allocationStrategy: "LowestPrice",
        },
        vmSizesProfile: [
          { name: "Standard_D2s_v5", rank: 1 },
          { name: "Standard_D4s_v5", rank: 2 },
        ],
        computeProfile: {
          virtualMachineProfile: {
            storageProfile: {
              imageReference: {
                publisher: "Canonical",
                offer: "0001-com-ubuntu-server-jammy",
                sku: "22_04-lts-gen2",
                version: "latest",
              },
              osDisk: {
                osType: "Linux",
                caching: "ReadWrite",
                createOption: "FromImage",
                managedDisk: { storageAccountType: "Premium_LRS" },
                deleteOption: "Delete",
              },
            },
            osProfile: {
              computerName: "bulkvm",
              adminUsername: "azureuser",
              linuxConfiguration: {
                disablePasswordAuthentication: true,
                ssh: {
                  publicKeys: [
                    {
                      path: "/home/azureuser/.ssh/authorized_keys",
                      keyData:
                        "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDExampleKeyReplaceWithYourOwn azureuser@bulklaunch",
                    },
                  ],
                },
              },
            },
            networkProfile: {
              networkApiVersion: "2020-11-01",
              networkInterfaceConfigurations: [
                {
                  name: "bulkvm-nic",
                  properties: {
                    primary: true,
                    deleteOption: "Delete",
                    ipConfigurations: [
                      {
                        name: "bulkvm-ipconfig",
                        properties: {
                          primary: true,
                          subnet: {
                            id: "/subscriptions/1FBA3C66-5C9C-4391-B72F-9F52735FC9F2/resourceGroups/rgBulkactions/providers/Microsoft.Network/virtualNetworks/bulkvnet/subnets/default",
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          computeApiVersion: "2024-11-01",
        },
        zoneAllocationPolicy: {
          distributionStrategy: "BestEffortBalanced",
          zonePreferences: [
            { zone: "1", rank: 1 },
            { zone: "2", rank: 2 },
          ],
        },
        executionParameters: {
          retryPolicy: { retryWindowInMinutes: 30, onFailureAction: "Delete" },
        },
      },
      zones: ["1", "2"],
      tags: { workload: "batch-render", env: "prod" },
      identity: { type: "SystemAssigned" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bulkCreateCreateOrUpdateMaximumSet();
}

main().catch(console.error);
