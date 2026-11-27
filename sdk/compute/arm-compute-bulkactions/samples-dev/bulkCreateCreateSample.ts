// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates virtual machines in bulk.
 *
 * @summary creates virtual machines in bulk.
 * x-ms-original-file: 2026-10-16/BulkCreate_Create.json
 */
async function createTwoLinuxVirtualMachinesWithASharedProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreate.create(
    "rg-bulk-create",
    "eastus",
    "fb5e3fe5-f509-4d7c-8f6a-fe65eeef921e",
    {
      zones: ["1"],
      properties: {
        capacity: 2,
        capacityType: "VM",
        computeProfile: {
          computeApiVersion: "2024-11-01",
          virtualMachineProfile: {
            hardwareProfile: { vmSize: "Standard_D2s_v5" },
            storageProfile: {
              imageReference: {
                publisher: "Canonical",
                offer: "0001-com-ubuntu-server-jammy",
                sku: "22_04-lts-gen2",
                version: "latest",
              },
              osDisk: {
                createOption: "FromImage",
                managedDisk: { storageAccountType: "Premium_LRS" },
                deleteOption: "Delete",
              },
            },
            osProfile: {
              computerName: "batchvm",
              adminUsername: "azureuser",
              linuxConfiguration: {
                disablePasswordAuthentication: true,
                ssh: {
                  publicKeys: [
                    {
                      path: "/home/azureuser/.ssh/authorized_keys",
                      keyData: "ssh-rsa <your-public-key>",
                    },
                  ],
                },
                provisionVMAgent: true,
                patchSettings: {
                  patchMode: "AutomaticByPlatform",
                  assessmentMode: "AutomaticByPlatform",
                },
              },
            },
            networkProfile: {
              networkApiVersion: "2022-11-01",
              networkInterfaceConfigurations: [
                {
                  name: "vm-nic",
                  properties: {
                    primary: true,
                    deleteOption: "Delete",
                    ipConfigurations: [
                      {
                        name: "ipconfig",
                        properties: {
                          primary: true,
                          subnet: {
                            id: "/subscriptions/57018409-63ae-4ec4-91ef-57bafe128d74/resourceGroups/rg-bulk-create/providers/Microsoft.Network/virtualNetworks/batch-vnet/subnets/default",
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates virtual machines in bulk.
 *
 * @summary creates virtual machines in bulk.
 * x-ms-original-file: 2026-10-16/BulkCreate_Create_Spot.json
 */
async function createTwoSpotVirtualMachinesWithASharedProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreate.create(
    "rg-bulk-create",
    "eastus",
    "c06999ea-a1b6-494c-9f90-47d6e081719d",
    {
      zones: ["1"],
      properties: {
        capacity: 2,
        capacityType: "VM",
        computeProfile: {
          computeApiVersion: "2024-11-01",
          virtualMachineProfile: {
            hardwareProfile: { vmSize: "Standard_D2s_v5" },
            storageProfile: {
              imageReference: {
                publisher: "Canonical",
                offer: "0001-com-ubuntu-server-jammy",
                sku: "22_04-lts-gen2",
                version: "latest",
              },
              osDisk: {
                createOption: "FromImage",
                managedDisk: { storageAccountType: "Premium_LRS" },
                deleteOption: "Delete",
              },
            },
            osProfile: {
              computerName: "batchvm",
              adminUsername: "azureuser",
              linuxConfiguration: {
                disablePasswordAuthentication: true,
                ssh: {
                  publicKeys: [
                    {
                      path: "/home/azureuser/.ssh/authorized_keys",
                      keyData: "ssh-rsa <your-public-key>",
                    },
                  ],
                },
                provisionVMAgent: true,
                patchSettings: {
                  patchMode: "AutomaticByPlatform",
                  assessmentMode: "AutomaticByPlatform",
                },
              },
            },
            networkProfile: {
              networkApiVersion: "2022-11-01",
              networkInterfaceConfigurations: [
                {
                  name: "vm-nic",
                  properties: {
                    primary: true,
                    deleteOption: "Delete",
                    ipConfigurations: [
                      {
                        name: "ipconfig",
                        properties: {
                          primary: true,
                          subnet: {
                            id: "/subscriptions/57018409-63ae-4ec4-91ef-57bafe128d74/resourceGroups/rg-bulk-create/providers/Microsoft.Network/virtualNetworks/batch-vnet/subnets/default",
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
            priority: "Spot",
            evictionPolicy: "Delete",
            billingProfile: { maxPrice: -1 },
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createTwoLinuxVirtualMachinesWithASharedProfile();
  await createTwoSpotVirtualMachinesWithASharedProfile();
}

main().catch(console.error);
