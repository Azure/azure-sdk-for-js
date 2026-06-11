// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeBulkActionsClient } from "@azure/arm-computebulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteCreate_MaximumSet_Gen.json
 */
async function bulkActionsVirtualMachinesExecuteCreateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesExecuteCreate("eastus2euap", {
    resourceConfigParameters: {
      resourceCount: 1,
      baseProfile: {
        resourcegroupName: "yourresourcegroup",
        computeApiVersion: "2023-09-01",
        properties: {
          vmExtensions: [
            {
              name: "Microsoft.Azure.Geneva.GenevaMonitoring",
              location: "eastus2euap",
              properties: {
                autoUpgradeMinorVersion: true,
                enableAutomaticUpgrade: true,
                suppressFailures: true,
                publisher: "Microsoft.Azure.Geneva",
                type: "GenevaMonitoring",
                typeHandlerVersion: "2.0",
              },
            },
          ],
          hardwareProfile: { vmSize: "Standard_D2ads_v5" },
          storageProfile: {
            imageReference: {
              publisher: "MicrosoftWindowsServer",
              offer: "WindowsServer",
              sku: "2022-datacenter-azure-edition",
              version: "latest",
            },
            osDisk: {
              osType: "Windows",
              createOption: "FromImage",
              caching: "ReadWrite",
              managedDisk: { storageAccountType: "Standard_LRS" },
              deleteOption: "Detach",
              diskSizeGB: 127,
            },
            diskControllerType: "SCSI",
          },
          networkProfile: {
            networkInterfaceConfigurations: [
              {
                name: "vmTest",
                properties: {
                  primary: true,
                  enableIPForwarding: true,
                  ipConfigurations: [
                    {
                      name: "vmTest",
                      properties: {
                        subnet: {
                          id: "/subscriptions/264f0c8a-4d5f-496c-80df-b438624ce55f/resourceGroups/yourresourcegroup/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/default",
                        },
                        primary: true,
                        applicationGatewayBackendAddressPools: [],
                        loadBalancerBackendAddressPools: [],
                      },
                    },
                  ],
                },
              },
            ],
            networkApiVersion: "2022-07-01",
          },
        },
      },
      resourceOverrides: [
        {
          name: "testvmtestTwo",
          location: "eastus2euap",
          properties: {
            hardwareProfile: { vmSize: "Standard_D2ads_v5" },
            osProfile: {
              computerName: "testtestTwo",
              adminUsername: "testUserName",
              adminPassword: "YourStr0ngP@ssword123!",
              windowsConfiguration: {
                provisionVmAgent: true,
                enableAutomaticUpdates: true,
                patchSettings: { patchMode: "AutomaticByPlatform", assessmentMode: "ImageDefault" },
              },
            },
          },
        },
      ],
    },
    executionParameters: { retryPolicy: { retryCount: 5, retryWindowInMinutes: 45 } },
    correlationid: "7efcfae3-f50d-4323-9aba-1093a33368f8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteCreate_MinimumSet_Gen.json
 */
async function bulkActionsVirtualMachinesExecuteCreateMinimumSetGenGeneratedByMinimumSetRuleGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesExecuteCreate("eastus2euap", {
    resourceConfigParameters: { resourceCount: 1 },
    executionParameters: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await bulkActionsVirtualMachinesExecuteCreateMaximumSetGenGeneratedByMaximumSetRule();
  await bulkActionsVirtualMachinesExecuteCreateMinimumSetGenGeneratedByMinimumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
