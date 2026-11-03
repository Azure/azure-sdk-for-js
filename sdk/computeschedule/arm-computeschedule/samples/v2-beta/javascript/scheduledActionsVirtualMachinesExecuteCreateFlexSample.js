// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesExecuteCreateFlex: Execute create operation for a batch of virtual machines with flex properties, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteCreateFlex: Execute create operation for a batch of virtual machines with flex properties, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_VirtualMachinesExecuteCreateFlex_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteCreateFlexMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteCreateFlex("eastus2", {
    resourceConfigParameters: {
      virtualMachineBaseProfile: {
        name: "baseFlexVmConfig",
        computeApiVersion: "2024-07-01",
        resourceGroupName: "myResourceGroup",
        zones: ["1"],
        identity: { type: "SystemAssigned" },
        tags: { environment: "production", department: "engineering" },
        properties: {
          storageProfile: {
            imageReference: {
              publisher: "Canonical",
              offer: "0001-com-ubuntu-server-jammy",
              sku: "22_04-lts-gen2",
              version: "latest",
            },
            osDisk: {
              osType: "Linux",
              name: "myOsDisk",
              caching: "ReadWrite",
              createOption: "FromImage",
              diskSizeGB: 128,
              managedDisk: { storageAccountType: "Premium_LRS" },
              deleteOption: "Delete",
            },
            dataDisks: [
              {
                lun: 0,
                name: "myDataDisk-0",
                caching: "ReadOnly",
                createOption: "Empty",
                diskSizeGB: 256,
                managedDisk: { storageAccountType: "Premium_LRS" },
                deleteOption: "Delete",
              },
            ],
            diskControllerType: "SCSI",
          },
          additionalCapabilities: { ultraSSDEnabled: false, hibernationEnabled: false },
          osProfile: {
            computerName: "myFlexVM",
            adminUsername: "azureuser",
            linuxConfiguration: {
              disablePasswordAuthentication: true,
              ssh: {
                publicKeys: [
                  {
                    path: "/home/azureuser/.ssh/authorized_keys",
                    keyData: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQ...",
                  },
                ],
              },
              provisionVMAgent: true,
              patchSettings: {
                patchMode: "AutomaticByPlatform",
                assessmentMode: "AutomaticByPlatform",
              },
            },
            allowExtensionOperations: true,
          },
          networkProfile: {
            networkInterfaces: [
              {
                properties: { primary: true, deleteOption: "Delete" },
                id: "/subscriptions/732116BD-AF31-4E74-9283-B387C44B4A44/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/myNic",
              },
            ],
          },
          securityProfile: {
            uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
            securityType: "TrustedLaunch",
          },
          diagnosticsProfile: { bootDiagnostics: { enabled: true } },
        },
        vmExtensions: [
          {
            name: "AzureMonitorLinuxAgent",
            properties: {
              publisher: "Microsoft.Azure.Monitor",
              type: "AzureMonitorLinuxAgent",
              typeHandlerVersion: "1.0",
              autoUpgradeMinorVersion: true,
              enableAutomaticUpgrade: true,
              settings: {},
              suppressFailures: false,
            },
          },
        ],
      },
      virtualMachineOverrides: [
        {
          name: "overrideFlexVmConfig-0",
          computeApiVersion: "2024-07-01",
          zones: ["2"],
          tags: { environment: "production", department: "engineering", role: "web-server" },
          properties: {
            storageProfile: {
              osDisk: {
                osType: "Linux",
                name: "overrideOsDisk",
                caching: "ReadWrite",
                createOption: "FromImage",
                diskSizeGB: 256,
                managedDisk: { storageAccountType: "Premium_LRS" },
                deleteOption: "Delete",
              },
            },
            networkProfile: {
              networkInterfaces: [
                {
                  properties: { primary: true, deleteOption: "Delete" },
                  id: "/subscriptions/732116BD-AF31-4E74-9283-B387C44B4A44/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/myNic-override",
                },
              ],
            },
          },
        },
      ],
      resourceCount: 24,
      resourcePrefix: "myFlexVm",
      flexProperties: {
        vmSizeProfiles: [
          { name: "Standard_D2s_v3", rank: 24 },
          { name: "Standard_D2s_v3", rank: 24 },
        ],
        osType: "Windows",
        priorityProfile: { type: "Regular", allocationStrategy: "LowestPrice" },
        zoneAllocationPolicy: {
          distributionStrategy: "BestEffortSingleZone",
          zonePreferences: [{ zone: "1", rank: 21 }],
        },
      },
    },
    executionParameters: {
      optimizationPreference: "Cost",
      retryPolicy: { retryCount: 3, retryWindowInMinutes: 30, onFailureAction: "Unknown" },
    },
    correlationId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesExecuteCreateFlex: Execute create operation for a batch of virtual machines with flex properties, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteCreateFlex: Execute create operation for a batch of virtual machines with flex properties, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_VirtualMachinesExecuteCreateFlex_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteCreateFlexMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteCreateFlex("eastus2", {
    resourceConfigParameters: {
      resourceCount: 24,
      flexProperties: {
        vmSizeProfiles: [
          { name: "Standard_D2s_v3", rank: 24 },
          { name: "Standard_D2s_v3", rank: 24 },
        ],
        osType: "Windows",
        priorityProfile: {},
      },
    },
    executionParameters: {},
  });
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesExecuteCreateFlexMaximumSet();
  await scheduledActionsVirtualMachinesExecuteCreateFlexMinimumSet();
}

main().catch(console.error);
