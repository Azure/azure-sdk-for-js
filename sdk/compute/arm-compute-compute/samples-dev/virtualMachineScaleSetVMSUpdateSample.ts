// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a virtual machine of a VM scale set.
 *
 * @summary updates a virtual machine of a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Update_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMS.update(
    "rgcompute",
    "aaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    {
      location: "westus",
      tags: {},
      properties: {
        networkProfileConfiguration: {
          networkInterfaceConfigurations: [
            {
              name: "vmsstestnetconfig5415",
              properties: {
                primary: true,
                enableAcceleratedNetworking: true,
                dnsSettings: { dnsServers: [] },
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "vmsstestnetconfig9693",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/vn4071/subnets/sn5503",
                      },
                      privateIPAddressVersion: "IPv4",
                      primary: true,
                      publicIPAddressConfiguration: {
                        name: "aaaaaaaaaaaaaaaaaa",
                        properties: {
                          idleTimeoutInMinutes: 18,
                          dnsSettings: {
                            domainNameLabel: "aaaaaaaaaaaaaaaaaa",
                          },
                          ipTags: [
                            {
                              ipTagType: "aaaaaaa",
                              tag: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
                            },
                          ],
                          publicIPPrefix: {
                            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                          },
                          publicIPAddressVersion: "IPv4",
                          deleteOption: "Delete",
                        },
                        sku: { name: "Basic", tier: "Regional" },
                      },
                      applicationGatewayBackendAddressPools: [
                        {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                        },
                      ],
                      applicationSecurityGroups: [
                        {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                        },
                      ],
                      loadBalancerBackendAddressPools: [
                        {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                        },
                      ],
                      loadBalancerInboundNatPools: [
                        {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                        },
                      ],
                    },
                  },
                ],
                enableFpga: true,
                networkSecurityGroup: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                },
                deleteOption: "Delete",
              },
            },
          ],
        },
        hardwareProfile: {
          vmSize: "Basic_A0",
          vmSizeProperties: { vCPUsAvailable: 9, vCPUsPerCore: 12 },
        },
        storageProfile: {
          imageReference: {
            publisher: "MicrosoftWindowsServer",
            offer: "WindowsServer",
            sku: "2012-R2-Datacenter",
            version: "4.127.20180315",
            sharedGalleryImageId: "aaaaaaaaaaaaaaaaaaaa",
            id: "a",
          },
          osDisk: {
            osType: "Windows",
            name: "vmss3176_vmss3176_0_OsDisk_1_6d72b805e50e4de6830303c5055077fc",
            createOption: "FromImage",
            caching: "None",
            managedDisk: {
              storageAccountType: "Standard_LRS",
              id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_0_OsDisk_1_6d72b805e50e4de6830303c5055077fc",
              diskEncryptionSet: { id: "aaaaaaaaaaaa" },
            },
            diskSizeGB: 127,
            encryptionSettings: {
              diskEncryptionKey: {
                secretUrl: "aaaaaaaa",
                sourceVault: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                },
              },
              keyEncryptionKey: {
                keyUrl: "aaaaaaaaaaaaaa",
                sourceVault: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                },
              },
              enabled: true,
            },
            vhd: {
              uri: "https://{storageAccountName}.blob.core.windows.net/{containerName}/{vhdName}.vhd",
            },
            image: {
              uri: "https://{storageAccountName}.blob.core.windows.net/{containerName}/{vhdName}.vhd",
            },
            writeAcceleratorEnabled: true,
            diffDiskSettings: { option: "Local", placement: "CacheDisk" },
            deleteOption: "Delete",
          },
          dataDisks: [
            {
              lun: 1,
              name: "vmss3176_vmss3176_0_disk2_6c4f554bdafa49baa780eb2d128ff39d",
              createOption: "Empty",
              caching: "None",
              managedDisk: {
                storageAccountType: "Standard_LRS",
                id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_0_disk2_6c4f554bdafa49baa780eb2d128ff39d",
                diskEncryptionSet: { id: "aaaaaaaaaaaa" },
              },
              diskSizeGB: 128,
              toBeDetached: true,
              vhd: {
                uri: "https://{storageAccountName}.blob.core.windows.net/{containerName}/{vhdName}.vhd",
              },
              image: {
                uri: "https://{storageAccountName}.blob.core.windows.net/{containerName}/{vhdName}.vhd",
              },
              writeAcceleratorEnabled: true,
              detachOption: "ForceDetach",
              deleteOption: "Delete",
            },
          ],
        },
        osProfile: {
          computerName: "test000000",
          adminUsername: "Foo12",
          windowsConfiguration: {
            provisionVMAgent: true,
            enableAutomaticUpdates: true,
            timeZone: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
            additionalUnattendContent: [
              {
                passName: "OobeSystem",
                componentName: "Microsoft-Windows-Shell-Setup",
                settingName: "AutoLogon",
                content: "aaaaaaaaaaaaaaaaaaaa",
              },
            ],
            patchSettings: {
              patchMode: "Manual",
              enableHotpatching: true,
              assessmentMode: "ImageDefault",
            },
            winRM: {
              listeners: [{ protocol: "Http", certificateUrl: "aaaaaaaaaaaaaaaaaaaaaa" }],
            },
          },
          secrets: [],
          allowExtensionOperations: true,
          requireGuestProvisionSignal: true,
          adminPassword: "aaaaaaaaaaaaaaaa",
          customData: "aaaa",
          linuxConfiguration: {
            disablePasswordAuthentication: true,
            ssh: { publicKeys: [{ path: "aaa", keyData: "aaaaaa" }] },
            provisionVMAgent: true,
            patchSettings: {
              patchMode: "ImageDefault",
              assessmentMode: "ImageDefault",
            },
          },
        },
        userData: "RXhhbXBsZSBVc2VyRGF0YQ==",
        networkProfile: {
          networkInterfaces: [
            {
              id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachineScaleSets/{vmss-name}/virtualMachines/0/networkInterfaces/vmsstestnetconfig5415",
              properties: { primary: true, deleteOption: "Delete" },
            },
          ],
          networkApiVersion: "2020-11-01",
          networkInterfaceConfigurations: [
            {
              name: "aaaaaaaaaaa",
              properties: {
                primary: true,
                deleteOption: "Delete",
                enableAcceleratedNetworking: true,
                enableFpga: true,
                enableIPForwarding: true,
                networkSecurityGroup: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                },
                dnsSettings: { dnsServers: ["aaaaaa"] },
                ipConfigurations: [
                  {
                    name: "aa",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                      },
                      primary: true,
                      publicIPAddressConfiguration: {
                        name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        properties: {
                          idleTimeoutInMinutes: 2,
                          deleteOption: "Delete",
                          dnsSettings: {
                            domainNameLabel: "aaaaaaaaaaaaaaaaaaaaaaaaa",
                          },
                          ipTags: [
                            {
                              ipTagType: "aaaaaaaaaaaaaaaaaaaaaaaaa",
                              tag: "aaaaaaaaaaaaaaaaaaaa",
                            },
                          ],
                          publicIPPrefix: {
                            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                          },
                          publicIPAddressVersion: "IPv4",
                          publicIPAllocationMethod: "Dynamic",
                        },
                        sku: { name: "Basic", tier: "Regional" },
                      },
                      privateIPAddressVersion: "IPv4",
                      applicationSecurityGroups: [
                        {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                        },
                      ],
                      applicationGatewayBackendAddressPools: [
                        {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                        },
                      ],
                      loadBalancerBackendAddressPools: [
                        {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                        },
                      ],
                    },
                  },
                ],
                dscpConfiguration: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                },
              },
            },
          ],
        },
        diagnosticsProfile: {
          bootDiagnostics: { enabled: true, storageUri: "aaaaaaaaaaaaa" },
        },
        instanceView: {
          platformUpdateDomain: 23,
          platformFaultDomain: 14,
          rdpThumbPrint: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
          vmAgent: {
            vmAgentVersion: "aaaaaaaaaaaaaaaaaaaaaaa",
            extensionHandlers: [
              {
                type: "aaaaaaaaaaaaa",
                typeHandlerVersion: "aaaaa",
                status: {
                  code: "aaaaaaaaaaaaaaaaaaaaaaa",
                  level: "Info",
                  displayStatus: "aaaaaa",
                  message: "a",
                  time: new Date("2021-11-30T12:58:26.522Z"),
                },
              },
            ],
            statuses: [
              {
                code: "aaaaaaaaaaaaaaaaaaaaaaa",
                level: "Info",
                displayStatus: "aaaaaa",
                message: "a",
                time: new Date("2021-11-30T12:58:26.522Z"),
              },
            ],
          },
          maintenanceRedeployStatus: {
            isCustomerInitiatedMaintenanceAllowed: true,
            preMaintenanceWindowStartTime: new Date("2021-11-30T12:58:26.531Z"),
            preMaintenanceWindowEndTime: new Date("2021-11-30T12:58:26.531Z"),
            maintenanceWindowStartTime: new Date("2021-11-30T12:58:26.531Z"),
            maintenanceWindowEndTime: new Date("2021-11-30T12:58:26.531Z"),
            lastOperationResultCode: "None",
            lastOperationMessage: "aaaaaa",
          },
          disks: [
            {
              name: "aaaaaaaaaaa",
              encryptionSettings: [
                {
                  diskEncryptionKey: {
                    secretUrl: "aaaaaaaa",
                    sourceVault: {
                      id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                    },
                  },
                  keyEncryptionKey: {
                    keyUrl: "aaaaaaaaaaaaaa",
                    sourceVault: {
                      id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
                    },
                  },
                  enabled: true,
                },
              ],
              statuses: [
                {
                  code: "aaaaaaaaaaaaaaaaaaaaaaa",
                  level: "Info",
                  displayStatus: "aaaaaa",
                  message: "a",
                  time: new Date("2021-11-30T12:58:26.522Z"),
                },
              ],
            },
          ],
          extensions: [
            {
              name: "aaaaaaaaaaaaaaaaa",
              type: "aaaaaaaaa",
              typeHandlerVersion: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
              substatuses: [
                {
                  code: "aaaaaaaaaaaaaaaaaaaaaaa",
                  level: "Info",
                  displayStatus: "aaaaaa",
                  message: "a",
                  time: new Date("2021-11-30T12:58:26.522Z"),
                },
              ],
              statuses: [
                {
                  code: "aaaaaaaaaaaaaaaaaaaaaaa",
                  level: "Info",
                  displayStatus: "aaaaaa",
                  message: "a",
                  time: new Date("2021-11-30T12:58:26.522Z"),
                },
              ],
            },
          ],
          vmHealth: {
            status: {
              code: "aaaaaaaaaaaaaaaaaaaaaaa",
              level: "Info",
              displayStatus: "aaaaaa",
              message: "a",
              time: new Date("2021-11-30T12:58:26.522Z"),
            },
          },
          bootDiagnostics: {
            status: {
              code: "aaaaaaaaaaaaaaaaaaaaaaa",
              level: "Info",
              displayStatus: "aaaaaa",
              message: "a",
              time: new Date("2021-11-30T12:58:26.522Z"),
            },
          },
          statuses: [
            {
              code: "aaaaaaaaaaaaaaaaaaaaaaa",
              level: "Info",
              displayStatus: "aaaaaa",
              message: "a",
              time: new Date("2021-11-30T12:58:26.522Z"),
            },
          ],
          placementGroupId: "aaa",
        },
        additionalCapabilities: {
          ultraSSDEnabled: true,
          hibernationEnabled: true,
        },
        securityProfile: {
          uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
          encryptionAtHost: true,
          securityType: "TrustedLaunch",
        },
        availabilitySet: {
          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
        },
        licenseType: "aaaaaaaaaa",
        protectionPolicy: {
          protectFromScaleIn: true,
          protectFromScaleSetActions: true,
        },
      },
      sku: { name: "Classic", tier: "aaaaaaaaaaaaaa", capacity: 29 },
      plan: {
        name: "aaaaaaaaaa",
        publisher: "aaaaaaaaaaaaaaaaaaaaaa",
        product: "aaaaaaaaaaaaaaaaaaaa",
        promotionCode: "aaaaaaaaaaaaaaaaaaaa",
      },
    },
  );
}

/**
 * This sample demonstrates how to updates a virtual machine of a VM scale set.
 *
 * @summary updates a virtual machine of a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Update_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMS.update(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    { location: "westus" },
  );
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMUpdateMaximumSetGen();
  await virtualMachineScaleSetVMUpdateMinimumSetGen();
}

main().catch(console.error);
