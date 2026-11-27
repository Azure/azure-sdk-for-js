// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates virtual machines in bulk with custom settings.
 *
 * @summary creates virtual machines in bulk with custom settings.
 * x-ms-original-file: 2026-10-16/BulkCreateCustom_Create.json
 */
async function createTwoLinuxVirtualMachinesWithIndividualNamesAndTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreateCustom.create(
    "rg-bulk-create",
    "eastus",
    "a1223fe4-126f-4905-a870-6d53e360cab5",
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
        overridesProfile: {
          overrides: [
            {
              virtualMachineName: "web-01",
              virtualMachineProfile: { osProfile: { computerName: "web-01" } },
              tags: { role: "web" },
            },
            {
              virtualMachineName: "worker-01",
              virtualMachineProfile: { osProfile: { computerName: "worker-01" } },
              tags: { role: "worker" },
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates virtual machines in bulk with custom settings.
 *
 * @summary creates virtual machines in bulk with custom settings.
 * x-ms-original-file: 2026-10-16/BulkCreateCustom_Create_NamePrefix.json
 */
async function createVirtualMachinesWithGeneratedNamesAndPerVMZones() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreateCustom.create(
    "rg-bulk-create",
    "eastus",
    "7a647154-67a1-4c1f-9fad-5e8db7f7155c",
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
        overridesProfile: {
          virtualMachineNamePrefix: "batch-worker",
          overrides: [
            { zone: "1", tags: { partition: "first" } },
            { zone: "2", tags: { partition: "second" } },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createTwoLinuxVirtualMachinesWithIndividualNamesAndTags();
  await createVirtualMachinesWithGeneratedNamesAndPerVMZones();
}

main().catch(console.error);
