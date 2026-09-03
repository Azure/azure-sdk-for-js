// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to [PRIVATE PREVIEW]: VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary [PRIVATE PREVIEW]: VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_VirtualMachinesExecuteCreate_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteCreateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteCreate("eastus2", {
    resourceConfigParameters: {
      virtualMachineBaseProfile: {
        name: "baseVmConfig",
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
            computerName: "myVM",
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
          name: "overrideVmConfig-0",
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
      resourceCount: 3,
      resourcePrefix: "myBulkVm",
    },
    executionParameters: {
      optimizationPreference: "Cost",
      retryPolicy: { retryCount: 3, retryWindowInMinutes: 30, onFailureAction: "Unknown" },
    },
    correlationId: "01234567-89ab-cdef-0123-456789abcdef",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to [PRIVATE PREVIEW]: VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary [PRIVATE PREVIEW]: VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_VirtualMachinesExecuteCreate_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteCreateMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteCreate("eastus2", {
    resourceConfigParameters: { resourceCount: 3 },
    executionParameters: {},
  });
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesExecuteCreateMaximumSet();
  await scheduledActionsVirtualMachinesExecuteCreateMinimumSet();
}

main().catch(console.error);
