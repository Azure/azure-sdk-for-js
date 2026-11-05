// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates BulkCreateCustoms.
 *
 * @summary creates or updates BulkCreateCustoms.
 * x-ms-original-file: 2026-10-06-preview/BulkCreateCustom_CreateOrUpdate_MaximumSet_Gen.json
 */
async function bulkCreateCustomCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreateCustom.createOrUpdate(
    "rgBulkactions",
    "eastus",
    "89f31926-145c-410c-a56a-5bc97359274c",
    {
      properties: {
        capacity: 2,
        capacityType: "VM",
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
            hardwareProfile: { vmSize: "Standard_D2s_v5" },
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
            priority: "Spot",
            evictionPolicy: "Deallocate",
            billingProfile: { maxPrice: 0.05 },
          },
          computeApiVersion: "2024-11-01",
        },
        overridesProfile: {
          virtualMachineNamePrefix: "bulkvm",
          overrides: [
            {
              virtualMachineName: "bulkvm-payments-0",
              zone: "1",
              extendedLocation: { name: "microsoftlosangeles1", type: "EdgeZone" },
              tags: { workload: "payments", env: "prod" },
              placement: { zonePlacementPolicy: "Any", includeZones: ["1"] },
            },
            {
              tags: { workload: "batch" },
              zone: "2",
              extendedLocation: { name: "microsoftlosangeles2", type: "EdgeZone" },
              placement: { zonePlacementPolicy: "Auto", excludeZones: ["3"] },
            },
          ],
        },
        executionParameters: {
          retryPolicy: { retryWindowInMinutes: 30, onFailureAction: "Delete" },
        },
      },
      zones: ["1", "2"],
      extendedLocation: { name: "microsoftlosangeles1", type: "EdgeZone" },
      placement: { zonePlacementPolicy: "Auto", includeZones: ["1", "2"], excludeZones: ["3"] },
      tags: { workload: "batch-render", env: "prod" },
      identity: { type: "SystemAssigned" },
    },
  );
  console.log(result);
}

async function main() {
  await bulkCreateCustomCreateOrUpdateMaximumSet();
}

main().catch(console.error);
